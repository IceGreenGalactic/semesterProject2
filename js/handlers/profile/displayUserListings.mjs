import { fetchUserProfile } from "../../api/index.mjs";
import { renderUserListingsTemplate } from "../../templates/userListings.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const ITEMS_PER_PAGE = 3;

export async function displayUserListings(userName) {
  try {
    showLoader();
    const profile = await fetchUserProfile(userName);

    const profileListingsElement = document.getElementById("profileListings");
    const profileButtonElement = document.getElementById("profileBtnListings");

    if (profileListingsElement && profileButtonElement) {
      if (profile.listings && profile.listings.length > 0) {
        let showAllListings = false;
        renderUserListingsTemplate(profile.listings.slice(0, ITEMS_PER_PAGE), profileListingsElement);
        const toggleButtonState = () => {
          showAllListings = !showAllListings;
          profileButtonElement.textContent = showAllListings ? "Show all listings" : "Show less listings";
        };

        const renderListings = () => {
          if (showAllListings) {
            profileListingsElement.innerHTML = "";
            renderUserListingsTemplate(profile.listings, profileListingsElement);
          } else {
            profileListingsElement.innerHTML = "";
            renderUserListingsTemplate(profile.listings.slice(0, ITEMS_PER_PAGE), profileListingsElement);
            profileButtonElement.textContent = "Show all listings";
          }
          toggleButtonState();
        };

        profileButtonElement.addEventListener("click", renderListings);
        renderListings();
      } else {
        profileButtonElement.textContent = "No listings added yet, start now!";
        profileButtonElement.addEventListener("click", redirectToCreateListing);
      }
    } else {
      showMessage("Error: Profile listings element not found.");
    }
  } catch (error) {
    console.error("Error displaying user listings:", error);
    showMessage("Error displaying user listings. Please try again later.", "error");
  } finally {
    hideLoader();
  }
}
function redirectToCreateListing() {
  window.location.href = "../../../listings/createListing/";
}
