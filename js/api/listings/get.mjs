import { listingsEndpoint } from "../api_constants.mjs";
import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";

/**
 * Retrieves all listings based on pagination, sorting, and filtering parameters.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {number} [limit=100] - The maximum number of listings per page.
 * @param {string} [sort="created"] - The field to sort the listings by.
 * @param {string} [sortOrder="desc"] - The sorting order (asc or desc).
 * @returns {Promise<Object>} A promise that resolves to the fetched listings data.
 * @throws {Error} If the fetching process fails.
 */

export async function getAllListings(page = 1, limit = 100, sort = "created", sortOrder = "desc") {
  const queryParams = `_seller=true&_bids=true&_active=true&page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`;
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

/**
 * Retrieves a listing by its ID.
 * @param {string} id - The ID of the listing to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the fetched listing data.
 * @throws {Error} If the ID is not provided or the fetching process fails.
 */

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

/**
 * Retrieves listings based on provided tags.
 * @param {string[]} tags - An array of tags to filter listings.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {number} [limit=100] - The maximum number of listings per page.
 * @returns {Promise<Object[]>} A promise that resolves to an array of fetched listings data.
 * @throws {Error} If the fetching process fails.
 */
export async function getListingsByTags(tags, page = 1, limit = 100, sort = "endsAt", sortOrder = "desc") {
  const queryParams = `_tag=${tags.join(",")}&page=${page}&limit=${limit}&_seller=true&_bids=true&sort=${sort}&sortOrder=${sortOrder}`;
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

/**
 * Searches for listings based on a search query.
 * @param {string} searchQuery - The search query to match against listing data.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {number} [limit=100] - The maximum number of listings per page.
 * @param {string} [sort="created"] - The field to sort the listings by.
 * @param {string} [sortOrder="desc"] - The sorting order (asc or desc).
 * @returns {Promise<Object>} A promise that resolves to the fetched listings data.
 * @throws {Error} If the search query is not provided or the fetching process fails.
 */

export async function getSearchListings(searchQuery, page = 1, limit = 100, sort = "created", sortOrder = "desc") {
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
