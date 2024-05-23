import { profilesEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { load } from "../../storage/token.mjs";
import { authFetch } from "../authFetch.mjs";
import { apiKey } from "../authFetch.mjs";

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

    return userData.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  } finally {
    hideLoader();
  }
}

// updates profile
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
