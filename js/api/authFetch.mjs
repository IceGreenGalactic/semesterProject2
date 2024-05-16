import { load } from "../storage/token.mjs";
import { showMessage } from "../utils/messages.mjs";

export const apiKey = "db837409-4611-42f2-bb4d-fd1874502200";

export function headers() {
  const accessToken = load("accessToken");

  if (!accessToken) {
    const error = new Error("Access token not found. Please log in.");
    showMessage(error.message, "error");
    throw error;
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Noroff-API-Key": apiKey,
  };
}

export async function authFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(),
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      showMessage(error.message, "error");
      throw error;
    }

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    showMessage("Failed to fetch data. Please try again later.", "error");
    throw error;
  }
}
