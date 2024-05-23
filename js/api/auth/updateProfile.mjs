import { authFetch } from "../authFetch.mjs";
import { profilesEndpoint } from "../api_constants.mjs";

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
