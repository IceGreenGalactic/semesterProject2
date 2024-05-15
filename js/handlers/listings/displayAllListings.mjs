import { getAllListings } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";
import { scrollToTop, createScrollToTopButton } from "../../utils/index.mjs";

let currentPage = 1;
let currentSort = "created";
let currentSortOrder = "desc";

export async function displayAllListings(sort = "created", sortOrder = "desc", page = 1) {
  try {
    const listingsResponse = await getAllListings(page, 40, sort, sortOrder);
    const allListingsContainer = document.querySelector("#allListings");

    if (page === 1) {
      allListingsContainer.innerHTML = "";
    }

    if (listingsResponse && Array.isArray(listingsResponse.data)) {
      const scrollToTopButton = createScrollToTopButton();
      scrollToTopButton.addEventListener("click", scrollToTop);
      renderAllListingTemplates(listingsResponse.data, allListingsContainer);
    } else {
      allListingsContainer.innerHTML = "<p>No listings available</p>";
    }
  } catch (error) {
    console.error("Error fetching and displaying listings", error);
  }
}

const showMoreBtn = document.getElementById("showMoreBtn");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", async () => {
    currentPage++;
    await displayAllListings(currentSort, currentSortOrder, currentPage);
  });
}

export const sortOptions = document.getElementById("sortOptions");
if (sortOptions) {
  sortOptions.addEventListener("change", async (event) => {
    const [sort, sortOrder] = event.target.value.split("-");
    currentSort = sort;
    currentSortOrder = sortOrder;
    currentPage = 1;
    sessionStorage.setItem("selectedSortOption", `${currentSort}-${currentSortOrder}`);
    await displayAllListings(currentSort, currentSortOrder, currentPage);
  });
}
