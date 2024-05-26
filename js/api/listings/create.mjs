import { listingsEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Creates a new listing with the provided form data.
 * @param {Object} formData - The form data for the new listing.
 * @returns {Promise<Object>} A promise that resolves to the created listing data.
 * @throws {Error} If the creation of the listing fails.
 */

export async function createListing(formData) {
  try {
    showLoader();
    const response = await authFetch(listingsEndpoint, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(`Failed to create listings: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    } else {
      return responseData.data;
    }
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  } finally {
    hideLoader();
  }
}
