import { openRegistrationModal } from "./registrationModal.mjs";
let loginModal;

// Function to open the login modal
export function openLoginModal() {
  loginModal = document.querySelector("#loginModal");
  if (loginModal) {
    const modal = new bootstrap.Modal(loginModal);
    modal.show();
  }
}

// Function to close the login modal
export function closeLoginModal() {
  loginModal = document.querySelector("#loginModal");
  if (loginModal) {
    const modal = bootstrap.Modal.getInstance(loginModal);
    if (modal) {
      modal.hide();
    }
  }
}

// function to switch modals
document.addEventListener("DOMContentLoaded", function () {
  const signUpLink = document.querySelector("#signUpLink");
  if (signUpLink) {
    signUpLink.addEventListener("click", function (event) {
      event.preventDefault();
      openRegistrationModal();
      closeLoginModal();
    });
  }
});

// for registration buttons
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector("#loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault();
      openLoginModal();
    });
  }
});
