import { listingsEndpoint } from "../api_constants.mjs";
import { hideLoader, showLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Updates a listing with the provided ID using the specified data.
 * @param {string} listingId - The ID of the listing to update.
 * @param {Object} updatedListingData - The updated data for the listing.
 * @returns {Promise<Object>} A promise that resolves to the updated listing data.
 * @throws {Error} If the update operation fails.
 */

export async function updateListing(listingId, updatedListingData) {
  const QUERY_PARAMS = "_seller=true&_bids=true";
  const updateURL = `${listingsEndpoint}/${listingId}?${QUERY_PARAMS}`;

  try {
    showLoader();
    const response = await authFetch(updateURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedListingData),
    });

    if (!response.ok) {
      const error = new Error(`Failed to update listing: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error updating listing:", error);
    throw error;
  } finally {
    hideLoader();
  }
}
