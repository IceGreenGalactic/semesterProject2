let editModalInstance;

/**
 * Opens the edit modal with the provided listing data and ID.
 * @param {object} listingData - The data of the listing to be edited.
 * @param {string} listingId - The ID of the listing to be edited.
 */
export function openEditModal(listingData, listingId) {
  const editListingModal = document.querySelector("#editListingModal");

  if (editListingModal) {
    const modal = new bootstrap.Modal(editListingModal);
    editModalInstance = modal;

    // Sets the input values to the listing data
    document.getElementById("titleInput").value = listingData.data.title || "";
    document.getElementById("descriptionInput").value = listingData.data.description || "";
    document.getElementById("tagsInput").value = (listingData.data.tags || []).join(", ");
    document.getElementById("mediaURLInput").value =
      listingData.data.media && listingData.data.media.length > 0 ? listingData.data.media[0].url : "";
    const endsAtDate = new Date(listingData.data.endsAt);
    const endsAtFormatted = endsAtDate.toISOString().slice(0, 16);
    document.getElementById("endsAtInput").value = endsAtFormatted || "";

    const updateListingBtn = document.getElementById("updateListingBtn");
    updateListingBtn.dataset.listingId = listingId;

    modal.show();
  }
}

export function closeEditModal() {
  if (editModalInstance) {
    try {
      editModalInstance.hide();
    } catch (error) {
      console.error("Error hiding edit modal:", error);
    }
  } else {
    console.error("Edit modal element not found.");
  }
}
