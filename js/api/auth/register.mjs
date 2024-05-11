import { registerUserEndpoint } from "../api_constants.mjs";

export async function registerUser(profile) {
  try {
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
      console.log("Registration successful! Please log in to continue.", "success");
      setTimeout(() => {
        window.location.href = "../../../profile/login";
      }, 3000);
      
      return result;
    } else {
      const errorMessage = result?.errors?.[0]?.message || "Registration failed. Please try again.";
      console.log(`Registration failed: ${errorMessage}`);
      if (errorMessage === "Profile already exists") {
        setTimeout(() => {
          window.location.href = "../../../profile/login";
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
}
