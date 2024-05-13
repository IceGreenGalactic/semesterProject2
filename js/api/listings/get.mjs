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

const QUERY_PARAMS = "_seller=true&_bids=true";

export async function getListingById(id) {
  if (!id) {
    throw new Error("getListingById requires a listing ID");
  }

  const getListingByIdURL = `${listingsEndpoint}/${id}?${QUERY_PARAMS}`;

  try {
    const response = await fetch(getListingByIdURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    throw error;
  }
}
