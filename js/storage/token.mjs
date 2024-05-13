

/**
 * Saves a value to the local storage with the specified accessToken.
 * @param {string} accessToken - The accessToken under which to save the value.
 * @param {any} value - The value to be saved.
 */
export function save(accessToken, value) {
  localStorage.setItem(accessToken, JSON.stringify(value));
}

/**
 * Loads a value from the local storage using the specified accessToken.
 * @param {string} accessToken - The accessToken associated with the value to load.
 * @returns {any} - The value associated with the specified accessToken, or null if the accessToken does not exist.
 */
export function load(accessToken) {
  try {
    const value = localStorage.getItem(accessToken);
    return JSON.parse(value);
  } catch {
    return null;
  }
}


/**
 * Removes a value from the local storage using the specified accessToken.
 * @param {string} accessToken - The accessToken associated with the value to remove.
 */
export function remove(accessToken) {
  localStorage.removeItem(accessToken);
}
