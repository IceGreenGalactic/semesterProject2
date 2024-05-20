import { listingsEndpoint } from "../../api/api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../../api/authFetch.mjs";
import { displayAllListings } from "./displayAllListings.mjs";

// Function to open the delete confirmation modal
export function handleDeleteButtonClick(event, listingId, pageType) {
  event.preventDefault();
  const deleteModal = document.querySelector("#deleteConfirmationModal");
  if (deleteModal) {
    const modal = new bootstrap.Modal(deleteModal);
    modal.show();

    // Add event listener to the delete confirmation button inside the modal
    document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
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
        modal.hide();
      } catch (error) {
        console.error("Error deleting listing:", error);
        showMessage("An error occurred while deleting the listing. Please try again later.", "error");
      } finally {
        hideLoader();
      }
    });
  }
}
