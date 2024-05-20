import { listingsEndpoint } from "../../api/api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../../api/authFetch.mjs";
import { displayAllListings } from "./displayAllListings.mjs";

export async function handleDeleteButtonClick(event, listingId, pageType) {
  event.preventDefault();

  try {
    const deleteURL = `${listingsEndpoint}/${listingId}`;

    showLoader();
    const response = await authFetch(deleteURL, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = new Error(`Failed to delete listing: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    if (pageType === "single") {
      window.location.href = "../../listings/allListings/";
    } else {
      displayAllListings();
    }
  } catch (error) {
    console.error("Error deleting listing:", error);
    showMessage("An error occurred while deleting the listing. Please try again later.", "error");
  } finally {
    hideLoader();
  }
}
