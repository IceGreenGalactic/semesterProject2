import { countdownTimer } from "../utils/countdown.mjs";

/**
 * Creates a user listing element based on the provided item data.
 * @param {Object} item - The item data representing the user listing.
 * @param {string} item.title - The title of the listing.
 * @param {Array} item.media - The media associated with the listing.
 * @param {string} item.media[].url - The URL of the listing image.
 * @param {string} item.title - The alt text of the listing image.
 * @param {string} item.created - The creation date of the listing.
 * @param {number} item._count.bids - The number of bids on the listing.
 * @param {Array} item.bids - The array of bids on the listing.
 * @param {string} item.id - The ID of the listing.
 * @returns {HTMLElement} The created user listing element.
 */

function createUserListingElement(item) {
  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add("col-8", "col-md-4", "mb-3");

  const card = document.createElement("div");
  card.classList.add("card", "h-100");

  const img = document.createElement("img");
  img.classList.add("card-img-top", "h-100", "m-auto", "mt-2");
  img.src = item.media[0].url;
  img.alt = item.title;

  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add("card-img-overlay", "d-flex", "flex-column", "text-center");
  const overlayInner = document.createElement("div");
  cardOverlay.style.pointerEvents = "none";
  overlayInner.classList.add("bg-light", "card", "rounded", "p-1");
  const timerTitle = document.createElement("h5");
  timerTitle.classList.add("headline-text", "mb-0");
  timerTitle.textContent = "Time Left";
  const timerSpan = document.createElement("span");
  timerSpan.classList.add("primary-color-text");
  timerSpan.setAttribute("id", "timer");
  timerSpan.textContent = countdownTimer(item);
  setInterval(() => {
    timerSpan.textContent = countdownTimer(item);
  }, 1000);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "m-auto");

  const title = document.createElement("h5");
  title.classList.add("card-title", "text-center");
  title.textContent = item.title;

  const list = document.createElement("ul");
  list.classList.add("list-unstyled");

  const createdItem = document.createElement("li");
  createdItem.innerHTML = `<b>Created:</b> ${new Date(item.created).toDateString()}`;

  const bidsItem = document.createElement("li");
  bidsItem.innerHTML = `<b>Bids:</b> ${item._count.bids}`;

  const highestBidItem = document.createElement("li");
  const lastBid = item.bids ? item.bids[item.bids.length - 1] : null;
  const highestBidAmount = lastBid ? lastBid.amount : 0;
  highestBidItem.innerHTML = `<b>Highest Bid:</b> <span class="fw-normal">${highestBidAmount} credits</span>`;

  const sellerItem = document.createElement("li");
  sellerItem.innerHTML = `<b>Seller:</b> You`;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("text-center", "mt-2");

  const viewButton = document.createElement("button");
  viewButton.classList.add("btn", "btn-primary", "btn-sm", "py-0", "my-2", "col-12");
  viewButton.textContent = "View Listing";
  viewButton.addEventListener("click", () => {
    window.location.href = `../../listings/singleListing/?id=${item.id}`;
  });

  cardOverlay.appendChild(overlayInner);
  overlayInner.appendChild(timerTitle);
  overlayInner.appendChild(timerSpan);
  list.appendChild(createdItem);
  list.appendChild(bidsItem);
  list.appendChild(highestBidItem);
  list.appendChild(sellerItem);

  buttonDiv.appendChild(viewButton);
  cardBody.appendChild(title);
  cardBody.appendChild(list);
  cardBody.appendChild(buttonDiv);

  card.appendChild(img);
  card.appendChild(cardOverlay);
  card.appendChild(cardBody);

  listingWrapper.appendChild(card);

  return listingWrapper;
}

/**
 * Renders user listing templates based on the provided listing data list and appends them to the specified parent element.
 * @param {Array} listingDataList - The array of listing data representing user listings.
 * @param {HTMLElement} parent - The parent element to which the listing templates will be appended.
 */
export function renderUserListingsTemplate(listingDataList, parent) {
  listingDataList.forEach((listingData) => {
    const listingElement = createUserListingElement(listingData);
    parent.appendChild(listingElement);
  });
}
