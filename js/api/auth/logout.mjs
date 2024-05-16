import { showLoader, hideLoader } from "../../utils/loader.mjs";

export function handleLogout() {
  showLoader();
  try {
    const logoutLinks = document.querySelectorAll(".logout-link");
    logoutLinks.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = "../../../";
        } catch (error) {
          console.error("Error during logout:", error);
          throw error;
        }
      });
    });
  } catch (error) {
    console.error("Error handling logout:", error);
    throw error;
  } finally {
    hideLoader();
  }
}
