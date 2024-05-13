import { load } from "../../storage/token.mjs";
import { openLoginModal } from "../../handlers/index.mjs";

// Check if the user is logged in

export function isLoggedIn() {
    const accessToken = load("accessToken");
    return accessToken !== null;
  }
  
  export function updateProfileNav() {
    const profileNavLink = document.getElementById("profileNavLink");
    const profileHamburgerLink = document.getElementById("profileHamburgerLink");
  
    if (isLoggedIn()) {
      // User is logged in
      profileNavLink.innerHTML = '<i class="fas fa-user"></i> Profile';
      profileNavLink.href = "./profile/";
      
      profileHamburgerLink.innerHTML = '<i class="fas fa-user"></i> Profile';
      profileHamburgerLink.href = "./profile/";
    } else {
      // User is not logged in
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
    }
  }
  