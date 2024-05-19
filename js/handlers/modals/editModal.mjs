let editModalInstance;

export function openEditModal(listingData, listingId) {
  const editListingModal = document.querySelector("#editListingModal");

  if (editListingModal) {
    const modal = new bootstrap.Modal(editListingModal);
    editModalInstance = modal; // Store the modal instance

    // Populate the modal with listing data
    document.getElementById("titleInput").value = listingData.data.title || "";
    document.getElementById("descriptionInput").value = listingData.data.description || "";
    document.getElementById("tagsInput").value = (listingData.data.tags || []).join(", ");
    document.getElementById("mediaURLInput").value =
      listingData.data.media && listingData.data.media.length > 0 ? listingData.data.media[0].url : "";
    const endsAtDate = new Date(listingData.data.endsAt);
    const endsAtFormatted = endsAtDate.toISOString().slice(0, 16);
    document.getElementById("endsAtInput").value = endsAtFormatted || "";

    // Set the listing ID as a data attribute to the update button
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
