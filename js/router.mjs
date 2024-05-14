import * as listeners from "./handlers/index.mjs";
import * as utils from "./utils/index.mjs";

export function router() {
  const path = location.pathname;

  switch (path) {
    case "/listings/allListings/":
      listeners.displayAllListings();
      return;
    case "/listings/singleListing/":
      listeners.displaySingleListing();
      utils.goBackButton();
      return;
  }
}
