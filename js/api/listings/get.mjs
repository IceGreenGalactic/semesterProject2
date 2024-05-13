import { listingsEndpoint } from "../api_constants.mjs";

export async function getAllListings() {
  try {
    const response = await fetch(listingsEndpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}
