import { listingsEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function getAllListings(page = 1, limit = 10, sort = "created", sortOrder = "desc") {
  const queryParams = `_seller=true&_bids=true&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`;
  const getAllUrl = `${listingsEndpoint}?${queryParams}`;

  try {
    showLoader();
    const response = await fetch(getAllUrl);
    if (!response.ok) {
      const error = new Error(`Failed to fetch listings: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  } finally {
    hideLoader();
  }
}

export async function getListingById(id) {
  const QUERY_PARAMS = "_seller=true&_bids=true";
  if (!id) {
    const error = new Error("getListingById requires a listing ID");
    showMessage(error.message, "warning");
    throw error;
  }

  const getListingByIdURL = `${listingsEndpoint}/${id}?${QUERY_PARAMS}`;

  try {
    showLoader();
    const response = await fetch(getListingByIdURL);
    if (!response.ok) {
      const error = new Error(`Failed to fetch listing: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    showMessage(`Error fetching listing by ID: ${error.message}`, "error");
    throw error;
  } finally {
    hideLoader();
  }
}

export async function getListingsByTags(tags, page = 1, limit = 100) {
  const queryParams = `_tag=${tags.join(",")}&_active=true&page=${page}&limit=${limit}&_seller=true&_bids=true`;
  const url = `${listingsEndpoint}?${queryParams}`;

  try {
    showLoader();
    const response = await fetch(url);
    if (!response.ok) {
      const error = new Error(`Failed to fetch listings: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    showMessage(`Error fetching listings: ${error.message}`, "error");
    return [];
  } finally {
    hideLoader();
  }
}

export async function getSearchListings(searchQuery, page = 1, limit = 10, sort = "created", sortOrder = "desc") {
  if (!searchQuery) {
    throw new Error("Search query is required");
  }

  const queryParams = `_seller=true&_bids=true&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&q=${searchQuery}`;
  const getSearchUrl = `${listingsEndpoint}/search?${queryParams}`;

  try {
    showLoader();
    const response = await fetch(getSearchUrl);
    if (!response.ok) {
      const error = new Error(`Failed to fetch listings: ${response.status}`);
      showMessage(error.message, "error");
      throw error;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  } finally {
    hideLoader();
  }
}
