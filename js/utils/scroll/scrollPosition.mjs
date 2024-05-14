import { getAllListings } from "../../api/listings/get.mjs";

export function storeScrollPosition() {
  const scrollPosition = window.scrollY;
  sessionStorage.setItem("scrollPosition", scrollPosition);
}

export function restoreScrollPosition() {
  const scrollPosition = sessionStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem("scrollPosition");
  }
}

// go back button
export async function goBackButton() {
  document.getElementById("goBackButton").addEventListener("click", async () => {
    try {
      const listingsResponse = await getAllListings();
      history.back();
      if (listingsResponse) {
        restoreScrollPosition();
      }
    } catch (error) {
      console.error("Error fetching listings data", error);
    }
  });
}

//scroll to top button

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling behavior
  });
}

export function createScrollToTopButton() {
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopButton.classList.add("scroll-to-top-button", "btn", "btn-primary", "btn-floating", "btn-md");

  document.body.appendChild(scrollToTopButton);
  scrollToTopButton.addEventListener("click", scrollToTop);
  handleScroll();
  return scrollToTopButton;
}

function handleScroll() {
  const scrollToTopButton = document.querySelector(".scroll-to-top-button");
  if (window.scrollY > 5000) {
    scrollToTopButton.classList.add("d-block");
  } else {
    scrollToTopButton.classList.remove("d-block");
  }
}

// Attach scroll event listener to window
window.addEventListener("scroll", handleScroll);
