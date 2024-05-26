/**
 * Displays a message modal with the specified content and type.
 * @param {string | Error} message - The message to display. Can be a string or an Error object.
 * @param {string} type - The type of message. Can be "success", "error", "warning", or any other string (default).
 * @returns {void}
 */

export function showMessage(message, type) {
  if (!showMessage.errorMessageDisplayed) {
    showMessage.errorMessageDisplayed = true;

    let borderColor, boxShadowColor, textShadowColor;
    switch (type) {
      case "success":
        borderColor = "border-success";
        boxShadowColor = "rgba(40, 167, 69, 0.5)";
        textShadowColor = "rgba(40, 167, 69, 0.7)";
        break;
      case "error":
        borderColor = "border-danger";
        boxShadowColor = "rgba(220, 53, 69, 0.5)";
        textShadowColor = "rgba(220, 53, 69, 0.7)";
        break;
      case "warning":
        borderColor = "border-warning";
        boxShadowColor = "rgba(255, 193, 7, 0.5)";
        textShadowColor = "rgba(255, 193, 7, 0.7)";
        break;
      default:
        borderColor = "border-info";
        boxShadowColor = "rgba(23, 162, 184, 0.5)";
        textShadowColor = "rgba(23, 162, 184, 0.7)";
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
    modalContent.classList.add("modal-content", "border", borderColor);
    modalContent.style.borderWidth = "6px";
    modalContent.style.boxShadow = `0 2px 8px ${boxShadowColor}`;

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    const modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.id = "messageModalLabel";
    modalTitle.textContent = capitalizeFirstLetter(type);
    modalTitle.style.textShadow = `1px 2px 2px ${textShadowColor}`;

    const closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "py-3");
    modalBody.textContent = message instanceof Error ? message.message : message;
    modalBody.style.textShadow = `1px 1px 3px ${textShadowColor}`;

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

    const modal = new bootstrap.Modal(modalElement);
    modal.show();

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
