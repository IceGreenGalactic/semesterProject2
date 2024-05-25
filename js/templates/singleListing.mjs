import { isLoggedIn } from "../utils/index.mjs";
import { openLoginModal } from "../handlers/index.mjs";
import { countdownTimer } from "../utils/countdown.mjs";
import { createCarouselElement } from "./carousel.mjs";
import { placeBid } from "../api/listings/putBid.mjs";
import { showMessage } from "../utils/messages.mjs";
import { load } from "../storage/token.mjs";
import * as handlers from "../handlers/index.mjs";

export function createSingleListingElement(item) {
  const userProfile = load("profile");
  const currentUser = userProfile;
  const isAuthor = currentUser && item.data.seller.email === currentUser.email;

  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add("card", "col-11", "col-sm-10", "p-2", "m-auto", "mb-3");

  const card = document.createElement("div");
  card.classList.add("row", "col-10", "m-auto", "justify-content-bottom", "align-top");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("col-lg-7", "col-12", "m-auto", "d-flex");
  const imgCarousel = createCarouselElement(item.data.media);
  imgCarousel.classList.add("w-100", "m-auto");

  // Countdown timer overlay
  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add("card-img-overlay", "d-flex", "flex-column", "text-center");
  cardOverlay.style.pointerEvents = "none";
  const overlayInner = document.createElement("div");
  overlayInner.classList.add("bg-light", "card", "rounded", "p-1");
  const timerTitle = document.createElement("h5");
  timerTitle.classList.add("headline-text", "mb-0");
  timerTitle.textContent = "Time Left";
  const timerSpan = document.createElement("span");
  timerSpan.classList.add("headline-text");
  timerSpan.textContent = countdownTimer(item.data);
  setInterval(() => {
    timerSpan.textContent = countdownTimer(item.data);
  }, 1000);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("col-lg-5", "col-12", "d-flex", "flex-column", "m-auto");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center", "m-auto");

  const title = document.createElement("h2");
  title.classList.add("card-title", "text-center", "headline-text", "my-3", "text-center");
  title.textContent = item.data.title;
  const seller = document.createElement("p");
  seller.classList.add("text-start");
  seller.textContent = `Seller: ${item.data.seller.name}`;

  const descriptionHeadline = document.createElement("h5");
  descriptionHeadline.classList.add("text-center");
  descriptionHeadline.textContent = "Description:";
  const description = document.createElement("p");
  description.classList.add("mb-3", "text-start");
  description.textContent = `${item.data.description}`;

  const infoHeadline = document.createElement("h5");
  infoHeadline.textContent = "Info:";

  const created = document.createElement("p");
  created.classList.add("text-start");
  created.textContent = `Created:   ${new Date(item.data.created).toDateString()}`;
  const ending = document.createElement("p");
  ending.classList.add("text-start");
  setInterval(() => {
    ending.textContent = `Ends at: ${new Date(item.data.endsAt).toDateString()} (${countdownTimer(item.data)})`;
  }, 1000);

  const currentBids = document.createElement("p");
  currentBids.classList.add("text-start");
  currentBids.textContent = `Current bids: ${item.data._count.bids} `;

  const highestBid = document.createElement("h4");
  highestBid.classList.add("card-text", "primary-color-text", "mt-4", "text-start");
  const lastBid = item.data.bids[item.data.bids.length - 1];
  const highestBidAmount = lastBid ? lastBid.amount : 0;
  highestBid.textContent = `Highest Bid: ${highestBidAmount} credits`;

  const defaultBidAmount = lastBid ? lastBid.amount + 1 : 1;

  const bidForm = document.createElement("form");
  bidForm.classList.add("bid-form");

  const bidInput = document.createElement("input");
  bidInput.setAttribute("type", "number");
  bidInput.setAttribute("min", defaultBidAmount);
  bidInput.setAttribute("placeholder", "Enter your bid amount");
  bidInput.classList.add("form-control", "mb-2");

  const placeBidBtn = document.createElement("button");
  placeBidBtn.classList.add(
    "btn",
    "btn-primary",
    "btn-sm",
    "col-10",
    "col-sm-6",
    "col-md-4",
    "col-lg-6",
    "my-4",
    "m-auto",
  );
  placeBidBtn.textContent = "Place a bid";
  placeBidBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    if (isLoggedIn()) {
      const bidAmount = bidInput.value;
      const auctionId = item.data.id;

      // Checks if bid amount is too small
      const lastBid = item.data.bids[item.data.bids.length - 1];
      const minBidAmount = lastBid ? lastBid.amount + 1 : 1;
      if (parseInt(bidAmount) < minBidAmount) {
        showMessage(`Your bid must be at least ${minBidAmount}. Please enter a higher amount.`, "warning");
        return;
      }

      // Updates the bid UI
      const updateBidUI = (newBidAmount, bidCount) => {
        highestBid.textContent = `Highest Bid: ${newBidAmount} credits`;
        currentBids.textContent = `Current bids: ${bidCount}`;

        const bidElement = document.createElement("p");
        bidElement.textContent = `${currentUser.name}: Amount: ${newBidAmount}`;
        bidElement.classList.add("border-bottom");
        bidsContainer.appendChild(bidElement);
      };

      await placeBid(auctionId, bidAmount, updateBidUI);
    } else {
      openLoginModal();
    }
  });

  const authorButtonsContainer = document.createElement("div");
  if (isAuthor) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-link", "me-2");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.value = item.data.id;
    editButton.addEventListener("click", (event) => {
      handlers.handleEditButtonClick(event, item.data.id, "single");
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-link", "me-2");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt text-danger"></i>';
    deleteButton.value = item.data.id;
    deleteButton.addEventListener("click", (event) => {
      handlers.handleDeleteButtonClick(event, item.data.id, "single");
    });

    authorButtonsContainer.appendChild(editButton);
    authorButtonsContainer.appendChild(deleteButton);
  }
  cardOverlay.appendChild(overlayInner);
  overlayInner.appendChild(timerTitle);
  overlayInner.appendChild(timerSpan);
  imgContainer.appendChild(imgCarousel);
  imgCarousel.appendChild(cardOverlay);
  card.appendChild(title);

  card.appendChild(imgContainer);

  card.appendChild(contentContainer);
  contentContainer.appendChild(cardBody);

  cardBody.appendChild(descriptionHeadline);

  cardBody.appendChild(description);
  cardBody.appendChild(infoHeadline);
  cardBody.appendChild(seller);
  cardBody.appendChild(created);
  cardBody.appendChild(ending);
  cardBody.appendChild(currentBids);

  let bidsContainer;
  if (isLoggedIn()) {
    const showMoreBtn = document.createElement("button");
    showMoreBtn.classList.add("btn", "btn-link", "primary-color-text", "mb-2", "me-auto");
    showMoreBtn.textContent = "Show bidding history (↓)";
    showMoreBtn.addEventListener("click", () => {
      bidsContainer.classList.toggle("d-none");
      showMoreBtn.textContent = bidsContainer.classList.contains("d-none")
        ? "Show bidding history (↓)"
        : "Show Less (↑)";
    });

    const bidsContainer = document.createElement("div");
    bidsContainer.classList.add("card-text", "text-start", "mb-2", "d-none", "ms-4", "p-3");

    const bidsList = document.createElement("ul");
    bidsList.classList.add("list-unstyled");

    item.data.bids.forEach((bid) => {
      const bidElement = document.createElement("li");
      const bidDate = new Date(bid.created);
      const dateString = bidDate.toLocaleDateString();
      const timeString = bidDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      const bidderElement = document.createElement("strong");
      bidderElement.textContent = `${bid.bidder.name}:`;

      const bidInfo = document.createElement("span");
      bidInfo.textContent = ` Amount: ${bid.amount}`;

      const timeInfo = document.createElement("span");
      timeInfo.textContent = ` ${dateString} at: ${timeString}`;
      timeInfo.classList.add("ms-5");

      bidElement.appendChild(bidderElement);
      bidInfo.appendChild(timeInfo);
      bidElement.appendChild(bidInfo);

      bidElement.classList.add("mb-2", "pb-2", "border-bottom");

      bidsList.appendChild(bidElement);
    });

    bidsContainer.appendChild(bidsList);

    cardBody.appendChild(showMoreBtn);
    cardBody.appendChild(bidsContainer);
  }

  cardBody.appendChild(highestBid);
  cardBody.appendChild(bidForm);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(placeBidBtn);

  if (isAuthor) {
    bidForm.appendChild(authorButtonsContainer);
  }

  listingWrapper.appendChild(card);

  return listingWrapper;
}

export async function renderSingleListingTemplate(listingData, parent) {
  try {
    const listingElement = createSingleListingElement(listingData);
    if (listingElement) {
      const existingListingElement = parent.querySelector(`[data-listing-id="${listingData.id}"]`);
      if (existingListingElement) {
        existingListingElement.replaceWith(listingElement);
      } else {
        parent.appendChild(listingElement);
      }
    }
  } catch (error) {
    console.error("Error rendering listing template:", error);
    showMessage("An error has occored, pleas refresh page or try again later", "error");
  }
}
