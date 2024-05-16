import { loginModal } from "../../templates/loginModal.mjs";
import { openRegistrationModal } from "./registrationModal.mjs";

export const openLoginModal = () => {
  const modal = new bootstrap.Modal(loginModal);
  modal.show();
  document.body.addEventListener("click", backdropClickHandler);
};

export const closeLoginModal = () => {
  const modal = new bootstrap.Modal(document.getElementById("loginModal"));
  modal.hide();

  const modalElement = document.getElementById("loginModal");
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

// Function to handle clicks outside the login modal
const backdropClickHandler = (event) => {
  const modal = new bootstrap.Modal(document.getElementById("loginModal"));
  if (!modal._element.contains(event.target)) {
    closeLoginModal();
  }
};

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
