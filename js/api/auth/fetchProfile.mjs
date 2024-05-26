import { profilesEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { load } from "../../storage/token.mjs";
import { authFetch } from "../authFetch.mjs";
import { apiKey } from "../authFetch.mjs";

/**
 * Fetches the user profile data from the server.
 *
 * @param {string|null} profileData - The profile name to fetch data for. If null, the profile name is loaded from storage.
 * @returns {Promise<Object>} The user profile data, including listings and wins.
 * @throws {Error} Throws an error if the access token or profile data is not found, or if the fetch operation fails.
 */

export async function fetchUserProfile(profileData = null) {
  const accessToken = load("accessToken");

  if (!accessToken) {
    const error = new Error("Access token not found. Please log in.");
    showMessage(error.message, "error");
    throw error;
  }

  let profile = load("profile");

  if (!profile) {
    const error = new Error("Profile data not found. Please log in.");
    showMessage(error.message, "error");
    throw error;
  }

  if (!profileData) {
    profileData = profile.name;
  }

  if (!profileData) {
    const error = new Error("profileData not provided or found.");
    showMessage(error.message, "error");
    throw error;
  }

  const userProfileUrl = `${profilesEndpoint}/${profileData}`;
  try {
    showLoader();
    const response = await authFetch(userProfileUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch user profile: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const userData = await response.json();

    // Fetches user's listings
    const userListingsUrl = `${profilesEndpoint}/${profileData}/listings`;
    const listingsResponse = await authFetch(userListingsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!listingsResponse.ok) {
      const error = new Error(`Failed to fetch user listings: ${listingsResponse.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const listingsData = await listingsResponse.json();
    userData.data.listings = listingsData.data;

    const userWinsUrl = `${profilesEndpoint}/${profileData}/wins`;
    const winsResponse = await authFetch(userWinsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!winsResponse.ok) {
      const error = new Error(`Failed to fetch user wins: ${winsResponse.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const winsData = await winsResponse.json();
    userData.data.wins = winsData.data;

    return userData.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  } finally {
    hideLoader();
  }
}

/**
 * Updates the user's profile data on the server.
 *
 * @param {Object} profileData - The profile data to update.
 * @param {string} profileData.name - The name of the profile to update.
 * @returns {Promise<Object>} The updated profile data.
 * @throws {Error} Throws an error if the profile data does not include a name.
 */

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a name");
  }
  const updateProfileURL = `${profilesEndpoint}${profileData.name}`;
  const method = "PUT";

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
