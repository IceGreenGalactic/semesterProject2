import { profilesEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";
import { load } from "../../storage/token.mjs";
import { authFetch } from "../authFetch.mjs";

export async function fetchUserProfile(userName = null) {
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

  if (!userName) {
    userName = profile.name;
  }

  if (!userName) {
    const error = new Error("Username not provided or found.");
    showMessage(error.message, "error");
    throw error;
  }

  const userProfileUrl = `${profilesEndpoint}/${userName}`;
  try {
    showLoader();
    const response = await authFetch(userProfileUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error = new Error(`Failed to fetch user profile: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const userData = await response.json();

    // Fetches user's listings
    const userListingsUrl = `${profilesEndpoint}/${userName}/listings`;
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
