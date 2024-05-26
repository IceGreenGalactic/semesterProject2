import { getAllListings } from "../../api/listings/get.mjs";
import { renderSomeListings } from "../../templates/allListings.mjs";
import { scrollToTop, createScrollToTopButton } from "../../utils/index.mjs";
import { showMessage } from "../../utils/messages.mjs";

/**
 * Fetches and displays some listings, typically used for displaying upcoming auctions.
 * Fetches all listings and renders a subset of them.
 * Displays an error message if fetching/displaying the listings fails.
 * @returns {Promise<void>} A promise that resolves once the listings are displayed.
 */
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
    showMessage("Failed to fetch and display listings", "error");
  }
}
