import * as api from "./api/index.mjs";
import * as handlers from "./handlers/index.mjs";
import { router } from "./router.mjs";

document.addEventListener("DOMContentLoaded", function () {


  router();
});
