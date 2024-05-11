import { listingsEndpoint } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function getListings() {
    try {
        const response = await authFetch(listingsEndpoint);
        if (!response.ok) {
            throw new Error(`Failed to fetch listings: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error;
    }
}
