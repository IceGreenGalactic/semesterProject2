import { listingsEndpoint } from "../../api/api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../../api/authFetch.mjs";
import { updateListing } from "../../api/listings/edit.mjs";
import { displayAllListings } from "./displayAllListings.mjs";
import { openEditModal, closeEditModal } from "../modals/editModal.mjs";
import { displayUserListings } from "../index.mjs";

/**
 * Handles the click event for editing a listing.
 * Fetches the listing data for editing, displays the edit modal, and attaches an event listener
 * for updating the listing when the update button is clicked.
 * @param {Event} event - The click event object.
 * @param {string} listingId - The ID of the listing to edit.
 * @param {string} pageType - The type of page where the edit button was clicked (e.g., "single", "profile", etc.).
 * @returns {Promise<void>} A promise that resolves once the listing is edited.
 */
export async function handleEditButtonClick(event, listingId, pageType) {
  event.preventDefault();

  try {
    const editURL = `${listingsEndpoint}/${listingId}`;

    showLoader();
    const response = await authFetch(editURL);

    if (!response.ok) {
      const error = new Error(`Failed to fetch listing for editing: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const listingData = await response.json();
    openEditModal(listingData, listingId);
    attachUpdateListingListener(listingId, pageType);
  } catch (error) {
    console.error("Error fetching listing for editing:", error);
    showMessage("An error occurred while fetching the listing for editing. Please try again later.", "error");
  } finally {
    hideLoader();
  }
}

/**
 * Attaches an event listener to the update listing button in the edit modal.
 * Handles the click event for updating the listing.
 * @param {string} listingId - The ID of the listing to update.
 * @param {string} pageType - The type of page where the edit button was clicked (e.g., "single", "profile", etc.).
 */
export function attachUpdateListingListener(listingId, pageType) {
  const updateListingBtn = document.getElementById("updateListingBtn");
  updateListingBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const updatedListingData = {
      title: document.getElementById("titleInput").value,
      description: document.getElementById("descriptionInput").value,
      tags: document
        .getElementById("tagsInput")
        .value.split(",")
        .map((tag) => tag.trim()),
      media: document
        .getElementById("mediaURLInput")
        .value.split(",")
        .map((url) => ({ url: url.trim() })),
      endsAt: new Date(document.getElementById("endsAtInput").value).toISOString(),
    };

    try {
      showLoader();
      await updateListing(listingId, updatedListingData);
      closeEditModal();
      if (pageType === "single") {
        window.location.href = "../../listings/allListings/";
      } else if (pageType === "profile") {
        displayUserListings();
      } else {
        displayAllListings();
      }
    } catch (error) {
      console.error("Error updating listing:", error);
    } finally {
      hideLoader();
    }
  });
}
