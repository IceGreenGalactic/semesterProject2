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

/**
 * Performs an authenticated fetch request.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - Additional options for the fetch request.
 * @returns {Promise<Response>} A promise that resolves to the fetch response.
 * @throws {Error} If the fetch request fails.
 */

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
