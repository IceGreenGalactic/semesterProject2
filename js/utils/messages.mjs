export function showMessage(message, type) {
  if (!showMessage.errorMessageDisplayed) {
    showMessage.errorMessageDisplayed = true;

    let bgColor;
    switch (type) {
      case "success":
        bgColor = "bg-success";
        break;
      case "error":
        bgColor = "bg-danger";
        break;
      case "warning":
        bgColor = "bg-warning";
        break;
      default:
        bgColor = "bg-info";
    }

    const modalElement = document.createElement("div");
    modalElement.classList.add("modal", "fade");
    modalElement.setAttribute("tabindex", "-1");
    modalElement.setAttribute("role", "dialog");
    modalElement.setAttribute("aria-labelledby", "messageModalLabel");
    modalElement.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content", bgColor, "text-white");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.id = "messageModalLabel";
    modalTitle.textContent = capitalizeFirstLetter(type);

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "py-3");
    modalBody.textContent = message instanceof Error ? message.message : message;

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");
    const closeButtonFooter = document.createElement("button");
    closeButtonFooter.classList.add("btn", "btn-secondary");
    closeButtonFooter.setAttribute("data-bs-dismiss", "modal");
    closeButtonFooter.textContent = "Close";

    modalFooter.appendChild(closeButtonFooter);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalElement.appendChild(modalDialog);

    document.body.appendChild(modalElement);

    // Activate modal
    const modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Close modal after timeout
    setTimeout(() => {
      modal.hide();
      modalElement.remove();
      showMessage.errorMessageDisplayed = false;
    }, 3000);
  }
}

showMessage.errorMessageDisplayed = false;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
