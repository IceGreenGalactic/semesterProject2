import { loginUser } from "../../api/auth/login.mjs";

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Login form submitted");

      const formData = new FormData(form);
      const email = formData.get("email").toString(); // Ensure email is treated as a string
      const password = formData.get("password").toString(); // Ensure password is treated as a string

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
