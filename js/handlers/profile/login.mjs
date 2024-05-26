import { loginUser } from "../../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const email = formData.get("email").toString();
      const password = formData.get("password").toString();

      try {
        await loginUser(email, password);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    });
  }
}
