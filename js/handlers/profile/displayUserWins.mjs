import { fetchUserProfile } from "../../api/index.mjs";
import { renderUserListingsTemplate } from "../../templates/userListings.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";

const ITEMS_PER_PAGE = 3;

export async function displayUserWins(userName) {
  try {
    showLoader();
    const profile = await fetchUserProfile(userName);
    const profileWinsElement = document.getElementById("profilePurchases");
    const profileButtonElement = document.getElementById("profileBtnWins");

    if (profileWinsElement && profileButtonElement) {
      let showAllWins = false;

      const clearProfileWins = () => {
        profileWinsElement.innerHTML = "";
      };

      const toggleButtonState = () => {
        showAllWins = !showAllWins;
        profileButtonElement.textContent = showAllWins ? "Show less wins" : "Show more wins";
      };

      const renderWins = () => {
        clearProfileWins();

        if (profile.wins && profile.wins.length > 0) {
          if (showAllWins) {
            renderUserListingsTemplate(profile.wins, profileWinsElement);
          } else {
            renderUserListingsTemplate(profile.wins.slice(0, ITEMS_PER_PAGE), profileWinsElement);
          }
          toggleButtonState();
        } else {
          profileWinsElement.textContent = "No purchases yet.";
          profileWinsElement.classList.add("p-5");
        }
      };

      profileButtonElement.addEventListener("click", renderWins);
      renderWins();
    } else {
      showMessage("Error: Profile wins element not found.", "error");
    }
  } catch (error) {
    console.error("Error displaying user wins:", error);
    showMessage("Error displaying user wins. Please try again later.", "error");
  } finally {
    hideLoader();
  }
}
