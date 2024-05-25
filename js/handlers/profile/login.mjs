import { loginUser } from "../../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Login form submitted");

      const formData = new FormData(form);
      const email = formData.get("email").toString();
      const password = formData.get("password").toString();

      try {
        await loginUser(email, password);
        console.log("Login successful");
      } catch (error) {
        console.error("Error logging in:", error);
        console.log("Error login:" + error.message, "error");
      }
    });
  }
}
