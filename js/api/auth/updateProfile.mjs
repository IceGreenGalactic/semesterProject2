import { authFetch } from "../authFetch.mjs";
import { profilesEndpoint } from "../api_constants.mjs";

/**
 * Updates the user profile with the provided profile data.
 * @param {Object} profileData - The profile data to be updated.
 * @returns {Promise<Object>} A promise that resolves to the updated profile data.
 * @throws {Error} If the update fails or profile data is missing.
 */

const method = "PUT";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update requires a name");
  }

  const updateProfileURL = `${profilesEndpoint}/${profileData.name}`;

  const response = await authFetch(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return await response.json();
}
