import { showLoader, hideLoader } from "../../utils/loader.mjs";
import { showMessage } from "../../utils/messages.mjs";

export function handleLogout() {
  try {
    showLoader();

    const logoutLinks = document.querySelectorAll(".logout-link");
    logoutLinks.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();

        try {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "../../../";
        } catch (error) {
          console.error("Error during logout:", error.message);
          showMessage("Error during logout", "error");
          throw error;
        }
      });
    });
  } catch (error) {
    console.error("Error handling logout:", error.message);
    showMessage("Error handling logout", "error");
    throw error;
  } finally {
    hideLoader();
  }
}
