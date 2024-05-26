import { openLoginModal } from "./loginModal.mjs";

// Function to open the registration modal
export function openRegistrationModal() {
  const registrationModal = document.getElementById("registrationModal");
  if (registrationModal) {
    const modal = new bootstrap.Modal(registrationModal);
    modal.show();
  }
}

// Function to close the registration modal
export function closeRegistrationModal() {
  const registrationModal = document.getElementById("registrationModal");
  if (registrationModal) {
    const modal = bootstrap.Modal.getInstance(registrationModal);
    if (modal) {
      modal.hide();
    }
  }
}

// function to switch modals
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
      openRegistrationModal();
    });
  }
});
