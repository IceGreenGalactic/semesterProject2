import { save } from "../../storage/token.mjs";
import { loginUserEndpoint } from "../api_constants.mjs";
import { authFetch, apiKey } from "../authFetch.mjs";

export async function loginUser(email, password) {
  try {
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
        throw error;
      } else {
        throw new Error(`Failed to login: ${response.status}`);
      }
    }

    const { data } = await response.json(); 
    const { accessToken, ...profile } = data;
    save("accessToken", accessToken);
    save("profile", profile);

    if (accessToken) {
      setTimeout(() => {
        window.location.href = "../../../profile";
      }, 2000);
    } else {
      throw new Error("No access token provided, please register");
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
}
