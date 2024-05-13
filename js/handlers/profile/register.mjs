import { registerUser } from "../../api/auth/register.mjs";

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
  // Call the function to set up the listener
  setRegisterFormListener();
});