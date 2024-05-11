import { getListings } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";

export async function displayAllListings() {
    try {
        const listingsResponse = await getListings();
        const allListingsContainer = document.querySelector("#allListings");
        
        if (listingsResponse && Array.isArray(listingsResponse.data)) {
            allListingsContainer.innerHTML = "";
            renderAllListingTemplates(listingsResponse.data, allListingsContainer);
        } else {
            allListingsContainer.innerHTML = '<p>No listings available</p>';
        }
    } catch (error) {
        console.error("Error fetching and displaying listings", error);
    }
}
