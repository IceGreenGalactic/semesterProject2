import { getAllListings } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";
import { scrollToTop, createScrollToTopButton } from "../../utils/index.mjs";

export async function displayAllListings() {
  try {
    const listingsResponse = await getAllListings();
    const allListingsContainer = document.querySelector("#allListings");

    if (listingsResponse && Array.isArray(listingsResponse.data)) {
      allListingsContainer.innerHTML = "";
      const scrollToTopButton = createScrollToTopButton();
      scrollToTopButton.addEventListener("click", scrollToTop);
      renderAllListingTemplates(listingsResponse.data, allListingsContainer);
    } else {
      allListingsContainer.innerHTML = "<p>No listings available</p>";
    }
  } catch (error) {
    console.error("Error fetching and displaying listings", error);
  }
}
