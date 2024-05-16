import { isLoggedIn } from "../../utils/index.mjs";
import { openLoginModal } from "../index.mjs";
import { createListing } from "../../api/listings/create.mjs";
import { showLoader, hideLoader } from "../../utils/index.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function handleFormSubmission(event) {
  event.preventDefault();

  if (isLoggedIn()) {
    const formData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      tags: document
        .getElementById("tags")
        .value.split(",")
        .map((tag) => tag.trim()),
      media: [
        {
          url: document.getElementById("media").value,
          alt: "Listing Image",
        },
      ],
      endsAt: document.getElementById("endsAt").value,
    };

    try {
      showLoader();
      const response = await createListing(formData);

      if (response.id) {
        window.location.href = "../../../listings/allListings/";
      } else {
        const error = new Error("Failed to create listing");
        showMessage(error.message, "error");
      }
    } catch (error) {
      console.error("Failed to create listing:", error);
      showMessage(error.message || "An error occurred while creating the listing", "error");
    } finally {
      hideLoader();
    }
  } else {
    openLoginModal();
  }
}

const listingForm = document.getElementById("listingForm");
if (listingForm) {
  listingForm.addEventListener("submit", handleFormSubmission);
}
