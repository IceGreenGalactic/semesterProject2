import { listingsEndpoint } from "../../api/api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { authFetch } from "../../api/authFetch.mjs";
import { updateListing } from "../../api/listings/edit.mjs";
import { displayAllListings } from "./displayAllListings.mjs";
import { openEditModal, closeEditModal } from "../modals/editModal.mjs";

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
