import { getAllListings, getSearchListings } from "../../api/listings/get.mjs";
import { renderAllListingTemplates } from "../../templates/allListings.mjs";
import { scrollToTop, createScrollToTopButton } from "../../utils/index.mjs";
import { showMessage } from "../../utils/messages.mjs";

/**
 * Displays all listings based on the specified sorting parameters and search query.
 * @param {string} [sort="created"] - The field to sort by (e.g., "created", "title").
 * @param {string} [sortOrder="desc"] - The sorting order ("asc" for ascending, "desc" for descending).
 * @param {number} [page=1] - The page number to display.
 * @param {string} [searchQuery=""] - The search query to filter listings.
 */

let currentPage = 1;
let currentSort = "created";
let currentSortOrder = "desc";
let currentSearchQuery = "";

export async function displayAllListings(sort = "created", sortOrder = "desc", page = 1, searchQuery = "") {
  try {
    let listingsResponse;

    if (searchQuery) {
      listingsResponse = await getSearchListings(searchQuery, page, 40, sort, sortOrder);
    } else {
      listingsResponse = await getAllListings(page, 40, sort, sortOrder);
    }

    const allListingsContainer = document.querySelector("#allListings");

    if (page === 1) {
      allListingsContainer.innerHTML = "";
    }

    if (listingsResponse && Array.isArray(listingsResponse.data)) {
      const scrollToTopButton = createScrollToTopButton();
      scrollToTopButton.addEventListener("click", scrollToTop);
      renderAllListingTemplates(listingsResponse.data, allListingsContainer);

      const showMoreBtn = document.getElementById("showMoreBtn");

      if (listingsResponse.meta.isLastPage) {
        showMoreBtn.setAttribute("disabled", true);
      } else {
        showMoreBtn.removeAttribute("disabled");
      }
    } else {
      allListingsContainer.innerHTML = "<p>No listings available</p>";
    }
  } catch (error) {
    console.error("Error fetching and displaying listings", error);
    showMessage("Failed to fetch and display listings. Please try again later", "error");
  }
}

/**
 * Handles the click event of the "Show More" button to load more listings.
 */
const showMoreBtn = document.getElementById("showMoreBtn");
if (showMoreBtn) {
  showMoreBtn.addEventListener("click", async () => {
    currentPage++;
    await displayAllListings(currentSort, currentSortOrder, currentPage, currentSearchQuery);
  });
}

/**
 * Handles the change event of the sort options dropdown to update the displayed listings based on the selected sorting criteria.
 * Saves the selected sorting option to sessionStorage.
 */
export const sortOptions = document.getElementById("sortOptions");
if (sortOptions) {
  sortOptions.addEventListener("change", async (event) => {
    const [sort, sortOrder] = event.target.value.split("-");
    currentSort = sort;
    currentSortOrder = sortOrder;
    currentPage = 1;
    sessionStorage.setItem("selectedSortOption", `${currentSort}-${currentSortOrder}`);

    currentSearchQuery = "";

    await displayAllListings(currentSort, currentSortOrder, currentPage, currentSearchQuery);
  });
}

/**
 * Handles the form submission event for searching listings.
 * Updates the displayed listings based on the entered search query.
 */

export async function handleSearch(event) {
  if (event) {
    event.preventDefault();
    showMoreBtn.removeAttribute("disabled");
  }

  const searchInput = document.getElementById("searchInput");
  const listingsContainer = document.getElementById("allListings");

  if (!searchInput) {
    showMessage("Search input not found", "error");
    return;
  }

  if (!listingsContainer) {
    showMessage("Listings container not found", "error");
    return;
  }

  currentSearchQuery = searchInput.value.trim().toLowerCase();

  if (!currentSearchQuery) {
    showMessage("Please enter a search query", "info");
    return;
  }

  try {
    currentPage = 1;

    const listingsResponse = await getSearchListings(currentSearchQuery, currentPage);

    if (listingsResponse && Array.isArray(listingsResponse.data)) {
      listingsContainer.innerHTML = "";
      renderAllListingTemplates(listingsResponse.data, listingsContainer);
    } else {
      showMessage("No listings found for the given search query", "info");
      listingsContainer.innerHTML = "<p>No listings available</p>";
    }
  } catch (error) {
    console.error("Error filtering listings by search:", error);
    showMessage("Failed to update listings. Please try again." + error.message, "error");
  }
}

const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", async (event) => {
    await handleSearch(event);
    currentPage = 1;
  });
}
