// registrationModalHandlers.js

import { registrationModal } from "../../templates/registrationModal.mjs";
import { openLoginModal } from "./loginModal.mjs";

export const openRegistrationModal = () => {
  const modal = new bootstrap.Modal(registrationModal);
  modal.show();
  document.body.addEventListener("click", backdropClickHandler);
};

export const closeRegistrationModal = () => {
  const modal = new bootstrap.Modal(registrationModal);
  modal.hide();
  const modalElement = document.getElementById("registrationModal");
  modalElement.classList.remove("show");
  modalElement.style.display = "none";

  // Remove the backdrop element if it exists
  const backdrop = document.querySelector(".modal-backdrop");
  if (backdrop) {
    backdrop.parentNode.removeChild(backdrop);
  }
  document.body.style.overflow = "";
  document.body.removeEventListener("click", backdropClickHandler);
};

// Function to handle clicks outside the registration modal
const backdropClickHandler = (event) => {
  const modal = new bootstrap.Modal(registrationModal);
  if (!modal._element.contains(event.target)) {
    closeRegistrationModal();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const logInLink = document.querySelector("#logInLink");
  if (logInLink) {
    logInLink.addEventListener("click", function (event) {
      event.preventDefault();
      closeRegistrationModal();
      openLoginModal();
    });
  }
});

// for registration buttons
document.addEventListener("DOMContentLoaded", function () {
  const registerButton = document.querySelector("#registerButton");
  if (registerButton) {
    registerButton.addEventListener("click", function (event) {
      event.preventDefault();
      closeRegistrationModal();
      openLoginModal();
    });
  }
});
