import { fetchUserProfile } from "../../api/index.mjs";
import { updateProfile } from "../../api/auth/updateProfile.mjs";
import { load, save } from "../../storage/token.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { updateProfilePage } from "./updateProfileInfo.mjs";

/**
 * Sets up the event listener for the profile edit form.
 * Fetches the user's profile data, pre-fills the form, and handles the form submission.
 * @async
 * @function setEditProfileListener
 * @returns {Promise<void>} - A promise that resolves when the listener is set up.
 */
export async function setEditProfileListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    const { name, email } = load("profile");

    if (!name || !email) {
      showMessage("User not logged in or profile data is missing.", "error");
      return;
    }

    form.name.value = name;
    form.email.value = email;

    try {
      showLoader();
      const profile = await fetchUserProfile(name);

      if (profile) {
        form.address.value = profile.address || "";
        form.avatar.value = profile.avatar?.url || "";
        document.getElementById("userBio").textContent = profile.bio || "about you:";
      }

      form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const updatedProfile = {
          name: name,
          email: email,
          address: form.address.value,
          avatar: {
            url: form.avatar.value,
          },
          bio: form.bio.value,
        };

        try {
          showLoader();
          const response = await updateProfile(updatedProfile);

          if (response) {
            save("profile", updatedProfile);
            showMessage("Profile updated successfully!", "success");
            await updateProfilePage();
          } else {
            showMessage("Update failed. Please try again.", "error");
          }
        } catch (error) {
          console.error("Error updating profile", error);
          showMessage("Error updating profile. Please try again later.", "error");
        } finally {
          hideLoader();
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      showMessage("Error fetching profile. Please try again later.", "error");
    } finally {
      hideLoader();
    }
  }
}
