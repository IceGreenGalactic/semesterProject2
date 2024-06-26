import { load } from "../../storage/token.mjs";
import { openLoginModal } from "../../handlers/index.mjs";

/**
 * Checks if a user is logged in by verifying the presence of an access token.
 * @returns {boolean} A boolean indicating whether the user is logged in.
 */
export function isLoggedIn() {
  const accessToken = load("accessToken");
  return accessToken !== null;
}

/**
 * Updates the profile navigation links based on the user's login status.
 */
export function updateProfileNav() {
  const profileNavLink = document.getElementById("profileNavLink");
  const profileHamburgerLink = document.getElementById("profileHamburgerLink");
  const logoutLinks = document.querySelectorAll(".logout-link");

  if (isLoggedIn()) {
    profileNavLink.innerHTML = '<i class="fas fa-user"></i> Profile';
    profileNavLink.href = "../../../profile/";

    profileHamburgerLink.innerHTML = '<i class="fas fa-user"></i> Profile';
    profileHamburgerLink.href = "../../../profile/";

    logoutLinks.forEach((link) => {
      link.style.display = "block";
    });
  } else {
    profileNavLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> LogIn';
    profileNavLink.addEventListener("click", function (event) {
      event.preventDefault();
      openLoginModal();
    });

    profileHamburgerLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> LogIn';
    profileHamburgerLink.addEventListener("click", function (event) {
      event.preventDefault();
      openLoginModal();
    });

    logoutLinks.forEach((link) => {
      link.style.display = "none";
    });
  }
}
