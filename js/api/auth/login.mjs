import { save } from "../../storage/token.mjs";
import { loginUserEndpoint } from "../api_constants.mjs";
import { apiKey } from "../authFetch.mjs";
import { closeLoginModal } from "../../handlers/index.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function loginUser(email, password) {
  try {
    showLoader();
    const response = await fetch(loginUserEndpoint, {
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey,
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = new Error("Wrong password or email");
        error.type = "warning";
        showMessage(error.message, error.type);
        throw error;
      } else {
        const error = new Error(`Failed to login: ${response.status}`);
        showMessage(error.message, "error");
        throw error;
      }
    }

    const { data } = await response.json();
    const { accessToken, ...profile } = data;
    save("accessToken", accessToken);
    save("profile", profile);

    if (accessToken) {
      setTimeout(() => {
        closeLoginModal();
      }, 2000);
    } else {
      const error = new Error("No access token provided, please register");
      showMessage(error.message, "error");
      throw error;
    }
  } catch (error) {
    showMessage(error.message || "An error occurred during login", error.type || "error");
    throw error;
  } finally {
    hideLoader();
  }
}
