/**
 * opens a bid-modal.
 *  */
export function openBidModal() {
  const bidModal = new bootstrap.Modal(document.getElementById("bidModal"));
  bidModal.show();
}
