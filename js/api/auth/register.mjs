import { registerUserEndpoint } from "../api_constants.mjs";
import { openLoginModal } from "../../handlers/index.mjs";
import { closeRegistrationModal } from "../../handlers/modals/registrationModal.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function registerUser(profile) {
  try {
    showLoader();
    const response = await fetch(registerUserEndpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(profile),
    });

    if (!response) {
      throw new Error("Failed to get response from server.");
    }

    const result = await response.json();

    if (response.ok) {
      showMessage("Registration successful! Please log in to continue.", "success");

      setTimeout(() => {
        closeRegistrationModal();
        openLoginModal();
      }, 2000);
      return result;
    } else {
      const errorMessage = result?.errors?.[0]?.message || "Registration failed. Please try again.";
      showMessage(`Registration failed: ${errorMessage}`, "error");

      if (errorMessage === "Profile already exists") {
        setTimeout(() => {
          closeRegistrationModal();
          openLoginModal();
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    showMessage(`Error during registration: ${error.message}`, "error");
    throw error;
  } finally {
    hideLoader();
  }
}
