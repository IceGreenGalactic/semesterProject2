import { countdownTimer } from "../utils/countdown.mjs";
export function createSingleListingElement(item) {
  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add("card", "col-10", "m-auto", "mb-3");

  const card = document.createElement("div");
  card.classList.add("h-100", "m-auto", "pb-2", "row", "p-5", "align-items-center");

  // Image container column
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("col-lg-7", "my-auto", "position-relative");
  const img = document.createElement("img");
  img.classList.add("card-img-top", "h-auto", "m-auto", "img-fluid");
  img.src = item.data.media && item.data.media.length > 0 ? item.data.media[0].url : "../../images/noImage.jpg";
  img.alt = "listing image";

  // Countdown timer overlay
  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add("card-img-overlay", "d-flex", "flex-column", "text-center", "align-items-center");
  const overlayInner = document.createElement("div");
  overlayInner.classList.add("bg-light", "card", "rounded", "p-1");
  const timerTitle = document.createElement("h5");
  timerTitle.classList.add("headline-text", "mb-0");
  timerTitle.textContent = "Time Left";
  const timerSpan = document.createElement("span");
  timerSpan.classList.add("headline-text");
  timerSpan.textContent = countdownTimer(item.data);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("col-lg-5", "m-auto");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "text-center", "text-lg-start");

  const title = document.createElement("h2");
  title.classList.add("card-title", "text-center", "headline-text", "my-3");
  title.textContent = item.data.title;

  const descriptionHeadline = document.createElement("h5");
  descriptionHeadline.textContent = "Description:";
  const description = document.createElement("p");
  description.classList.add("mb-3");
  description.textContent = `${item.data.description}`;

  const bidsTitle = document.createElement("h5");
  bidsTitle.textContent = `Current bids: ${item.data._count.bids} `;

  const showMoreBtn = document.createElement("button");
  showMoreBtn.classList.add("btn", "btn-link", "primary-color-text", "m-auto", "mb-2");
  showMoreBtn.textContent = "show all bids  (↓)";
  showMoreBtn.addEventListener("click", () => {
    bidsContainer.classList.toggle("d-none");
    showMoreBtn.textContent = bidsContainer.classList.contains("d-none") ? "Show all bids  (↓)" : "Show Less (↑)";
  });

  const bidsContainer = document.createElement("div");
  bidsContainer.classList.add("card-text", "text-center", "m-auto", "mb-2", "bid-container", "d-none");

  item.data.bids.forEach((bid) => {
    const bidElement = document.createElement("p");
    bidElement.textContent = `${bid.bidder.name}: Amount: ${bid.amount}`;
    bidElement.classList.add("border-bottom");
    bidsContainer.appendChild(bidElement);
  });

  const highestBid = document.createElement("p");
  const lastBid = item.data.bids[item.data.bids.length - 1];
  const highestBidAmount = lastBid ? lastBid.amount : 0;
  highestBid.classList.add("card-text", "primary-color-text", "text-left", "border-bottom");
  highestBid.textContent = `Highest Bid: ${highestBidAmount} credits`;

  const placeBidBtn = document.createElement("button");
  placeBidBtn.classList.add("btn", "btn-primary", "btn-sm", "col-4", "my-4", "m-auto");
  placeBidBtn.textContent = "place a bid";
  placeBidBtn.addEventListener("click", () => {
    window.location.href = `../../listings/singleListing/?id=${item.data.id}`;
  });

  card.appendChild(title);
  cardOverlay.appendChild(overlayInner);
  overlayInner.appendChild(timerTitle);
  overlayInner.appendChild(timerSpan);
  imgContainer.appendChild(img);
  imgContainer.appendChild(cardOverlay);
  card.appendChild(imgContainer);
  card.appendChild(contentContainer);
  contentContainer.appendChild(cardBody);

  cardBody.appendChild(descriptionHeadline);
  cardBody.appendChild(description);
  cardBody.appendChild(bidsTitle);
  cardBody.appendChild(showMoreBtn);
  cardBody.appendChild(bidsContainer);
  cardBody.appendChild(highestBid);
  card.appendChild(placeBidBtn);

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
  }
}
