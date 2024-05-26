import { getListingById } from "../../api/listings/get.mjs";
import { renderSingleListingTemplate } from "../../templates/singleListing.mjs";
import { showMessage } from "../../utils/messages.mjs";

/**
 * Retrieves the listing ID from the URL parameters.
 * @returns {string|null} The listing ID if found in the URL parameters, otherwise null.
 */

function getSingleListings() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("id") ? urlParams.get("id") : null;
}

/**
 * Fetches and displays a single listing based on the listing ID retrieved from the URL parameters.
 * Displays an error message if the listing ID is not found or if fetching/displaying the listing fails.
 * @returns {Promise<void>} A promise that resolves once the single listing is displayed.
 */
export async function displaySingleListing() {
  const listingIdResponse = getSingleListings();
  if (!listingIdResponse) {
    console.error("Listing ID not found in URL parameters");
    showMessage("No listings matching the ID is found");
    return;
  }

  try {
    const listingData = await getListingById(listingIdResponse);
    const singleListingsContainer = document.querySelector("#singleListingItem");
    renderSingleListingTemplate(listingData, singleListingsContainer);
  } catch (error) {
    console.error("Error fetching and displaying listing:", error);
    showMessage("Failed to fetch and display listings, please try again later", "error");
  }
}
