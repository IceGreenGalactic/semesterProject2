import * as listeners from "./handlers/index.mjs";
import * as utils from "./utils/index.mjs";
import * as auth from "./api/index.mjs";
import { router } from "./router.mjs";

document.addEventListener("DOMContentLoaded", function () {
  router();
  utils.updateProfileNav();
  listeners.setLoginFormListener();
  auth.handleLogout();
});
