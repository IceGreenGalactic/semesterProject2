/**
 * Base URL for the Noroff API.
 * @type {string}
 */
export const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Endpoint for creating an API key.
 * @type {string}
 */
export const createApiKeyEndpoint = API_BASE_URL + "/auth/create-api-key";

/**
 * Endpoint for registering a new user.
 * @type {string}
 */
export const registerUserEndpoint = API_BASE_URL + "/auth/register";

/**
 * Endpoint for logging in a user.
 * @type {string}
 */
export const loginUserEndpoint = API_BASE_URL + "/auth/login";

/**
 * Endpoint for accessing auction listings.
 * @type {string}
 */
export const listingsEndpoint = API_BASE_URL + "/auction/listings";

/**
 * Endpoint for accessing user profiles.
 * @type {string}
 */
export const profilesEndpoint = API_BASE_URL + "/auction/profiles";
