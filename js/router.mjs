import * as listeners from "./handlers/index.mjs";
import * as utils from "./utils/index.mjs";

export function router() {
  const path = location.pathname;

  switch (path) {
    case "/":
      listeners.displaySomeListings();

      return;

    case "/listings/allListings/":
      listeners.displayAllListings();
      utils.restoreSelectedSortOption();
      return;

    case "/listings/singleListing/":
      listeners.displaySingleListing();
      return;

    default:
      if (path.startsWith("/listings/")) {
        listeners.displayListingsCategory();
      }
      return;
  }
}
