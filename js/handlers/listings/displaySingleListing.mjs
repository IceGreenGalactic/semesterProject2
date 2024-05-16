import { getListingById } from "../../api/listings/get.mjs";
import { renderSingleListingTemplate } from "../../templates/singleListing.mjs";
import { showMessage } from "../../utils/messages.mjs";

function getlistingIdResponseFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("id") ? urlParams.get("id") : null;
}

// Function to fetch and display single listing
export async function displaySingleListing() {
  const listingIdResponse = getlistingIdResponseFromUrl();
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
