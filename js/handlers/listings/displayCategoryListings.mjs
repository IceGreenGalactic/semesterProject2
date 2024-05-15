import { getListingsByTags } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export async function displayListingsCategory() {
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const tags = card.dataset.tags.split(",");

      try {
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
      } catch (error) {
        console.error("Error fetching listings:", error);
        const allListingsContainer = document.getElementById("allListings");
        allListingsContainer.innerHTML = "<p>Error fetching listings. Please try again later.</p>";
      }
    });
  });
}
