import { getListingsByTags } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function displayListingsCategory() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const tags = card.dataset.tags.split(",");

      try {
        showLoader();
        let allListings = [];
        let currentPage = 1;
        let hasMoreListings = true;

        while (hasMoreListings) {
          const listings = await getListingsByTags(tags, currentPage, 100);

          allListings = allListings.concat(listings);

          currentPage++;

          if (listings.length === 0) {
            hasMoreListings = false;
          }

          await delay(1000);
        }

        const allListingsContainer = document.getElementById("allListings");
        allListingsContainer.innerHTML = "";

        renderAllListingTemplates(allListings, allListingsContainer);

        const goBackBtn = document.createElement("button");
        const icon = document.createElement("i");
        icon.classList.add("fa", "fa-solid", "fa-left-long", "primary-color-text");
        goBackBtn.textContent = " Go back";
        goBackBtn.classList.add("btn", "btn-outline-primary", "my-3");
        goBackBtn.addEventListener("click", () => location.reload());

        const buttonContainer = document.getElementById("btnContainer");
        buttonContainer.appendChild(icon);
        buttonContainer.appendChild(goBackBtn);
      } catch (error) {
        console.error("Error fetching listings:", error);
        showMessage("Failed to fetch listings, please try again later", "error");
        const allListingsContainer = document.getElementById("allListings");
        allListingsContainer.innerHTML = "<p>Error fetching listings. Please try again later.</p>";
      } finally {
        hideLoader();
      }
    });
  });
}
