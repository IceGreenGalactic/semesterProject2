import { fetchUserProfile } from "../../api/index.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function updateProfilePage() {
  try {
    const profile = await fetchUserProfile();

    // Updates user name
    const userNameElement = document.getElementById("userName");
    if (userNameElement && profile.name) {
      userNameElement.textContent = profile.name;
    }

    // Updates user email
    const userEmailElement = document.getElementById("userEmail");
    if (userEmailElement && profile.email) {
      userEmailElement.textContent = `Email: ${profile.email}`;
    }

    // Updates user bio
    const userBioElement = document.getElementById("userBio");
    if (userBioElement && profile.bio) {
      userBioElement.textContent = `About you: ${profile.bio}`;
    } else {
      userBioElement.textContent = "";
    }

    // Updates user avatar
    const userAvatarElement = document.getElementById("userAvatar");
    if (userAvatarElement && profile.avatar && profile.avatar.url) {
      userAvatarElement.src = profile.avatar.url;
    }

    // Updates user credits
    const userCreditsElement = document.getElementById("userCredits");
    if (userCreditsElement && profile.credits !== undefined) {
      userCreditsElement.textContent = `Credits: ${profile.credits},-`;
    }

    // Updates user listings count
    const userListingsCountElement = document.getElementById("userListingsCount");
    if (userListingsCountElement && profile._count && profile._count.listings !== undefined) {
      userListingsCountElement.textContent = `Added Listings: ${profile._count.listings}`;
    }

    // Updates user wins count
    const userWinsCountElement = document.getElementById("userWinsCount");
    if (userWinsCountElement && profile._count && profile._count.wins !== undefined) {
      userWinsCountElement.textContent = `Won auctions: ${profile._count.wins}`;
    }
  } catch (error) {
    console.error("Error updating profile page:", error);
    showMessage("Error updating profile page. Please try again later.", "error");
  }
}
