import { remove } from "../../storage/token.mjs";


export function handleLogout() {
    const logoutLinks = document.querySelectorAll(".logout-link");
    logoutLinks.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        // Perform logout
        remove("accessToken");
        window.location.href = "../../../";
      });
    });
  }