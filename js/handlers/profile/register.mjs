import { registerUser } from "../../api/auth/register.mjs";

/**
 * Attaches a listener to the registration form to handle user registration.
 * When the form is submitted, it gathers the form data, converts it into
 * a profile object, and calls the registerUser function to register the user.
 */
export function setRegisterFormListener() {
  const form = document.querySelector("#registrationForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      const avatarUrl = profile.avatar;
      profile.avatar = { url: avatarUrl, alt: "Avatar alt text" };

      registerUser(profile)
        .then(() => {})
        .catch((error) => {
          console.error("Error registering:", error);
        });
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setRegisterFormListener();
});
