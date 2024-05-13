// router.mjs
import * as listeners from "./handlers/index.mjs";
import * as utils from "./utils/index.mjs";
import * as auth from "./api/index.mjs";

export function router() {
  const path = location.pathname;

  switch (path) {


    case "/listings/allListings/":
      listners.displayAllListings();
      return;
    case "/listings/singleListing/":
      listners.displaySingleListing();

      return;
      
         default:
      utils.updateProfileNav();

      listeners.setLoginFormListener();
      auth.handleLogout();
  }
}
