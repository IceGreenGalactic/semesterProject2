import { getAllListings } from "../../api/listings/get.mjs";
import { renderSomeListings } from "../../templates/allListings.mjs";
import { scrollToTop, createScrollToTopButton } from "../../utils/index.mjs";

export async function displaySomeListings() {
  try {
    const listingsResponse = await getAllListings();
    const someListingsContainer = document.querySelector("#upcomingAuctions");

    if (listingsResponse && Array.isArray(listingsResponse.data)) {
      someListingsContainer.innerHTML = "";
      const scrollToTopButton = createScrollToTopButton();
      scrollToTopButton.addEventListener("click", scrollToTop);
      renderSomeListings(listingsResponse.data, someListingsContainer);
    } else {
      someListingsContainer.innerHTML = "<p>No listings available</p>";
    }
  } catch (error) {
    console.error("Error fetching and displaying listings", error);
  }
}
