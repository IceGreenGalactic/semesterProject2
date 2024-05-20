import { countdownTimer } from "../utils/countdown.mjs";
import { storeScrollPosition } from "../utils/scroll/scrollPosition.mjs";
import { load } from "../storage/token.mjs";
import * as handlers from "../handlers/index.mjs";

export function createListingElement(item) {
  const userProfile = load("profile");
  const currentUser = userProfile;
  const isAuthor = currentUser && item.seller.email === currentUser.email;

  const listingWrapper = document.createElement("div");
  listingWrapper.classList.add("col-10", "col-md-6", "col-lg-4", "m-auto", "mb-3");
  const card = document.createElement("div");
  card.classList.add("card", "h-100", "m-auto", "pb-2");

  const img = document.createElement("img");
  img.classList.add("card-img-top", "h-auto", "m-auto", "listing-img");
  img.src = item.media && item.media.length > 0 ? item.media[0].url : "../../images/noImage.jpg";
  img.alt = "listing image";

  const cardOverlay = document.createElement("div");
  cardOverlay.classList.add("card-img-overlay", "d-flex", "flex-column", "text-center");
  const overlayInner = document.createElement("div");
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
  const title = document.createElement("h4");
  title.classList.add("card-title", "headline-text", "text-center");
  title.textContent = item.title;
  title.style.overflow = "hidden";
  title.style.textOverflow = "ellipsis";
  title.style.whiteSpace = "nowrap";
  title.style.maxWidth = "210px";

  const infoContainer = document.createElement("div");
  const seller = document.createElement("p");
  seller.innerHTML = `<span class="fw-bold">Seller:</span> ${item.seller.name}`;

  const created = document.createElement("p");
  created.innerHTML = `<span class="fw-bold">Created:</span> ${new Date(item.created).toDateString()}`;

  const bids = document.createElement("p");
  bids.innerHTML = `<span class="fw-bold">Bids:</span> ${item._count.bids}`;

  const highestBid = document.createElement("p");
  const lastBid = item.bids[item.bids.length - 1];
  const highestBidAmount = lastBid ? lastBid.amount : 0;
  highestBid.innerHTML = `<span class="fw-bold">Highest Bid:</span> <span class="fw-normal">${highestBidAmount} credits</span>`;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("text-center", "mt-2");
  const viewButton = document.createElement("button");
  viewButton.classList.add("btn", "btn-primary", "btn-sm", "py-0", "my-2");

  viewButton.textContent = "View Listing";
  viewButton.addEventListener("click", () => {
    storeScrollPosition();
    // Redirect to singleListing.html with the listing ID as a URL parameter
    window.location.href = `../../listings/singleListing/?id=${item.id}`;
  });
  const authorButtonsContainer = document.createElement("div");
  if (isAuthor) {
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-link", "me-2");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.value = item.id;
    editButton.addEventListener("click", (event) => {
      handlers.handleEditButtonClick(event, item.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-link", "me-2");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt text-danger"></i>';
    deleteButton.value = item.id;
    deleteButton.addEventListener("click", (event) => {
      handlers.handleDeleteButtonClick(event, item.id);
    });

    authorButtonsContainer.appendChild(editButton);
    authorButtonsContainer.appendChild(deleteButton);
  }

  cardOverlay.appendChild(overlayInner);
  overlayInner.appendChild(timerTitle);
  overlayInner.appendChild(timerSpan);
  card.appendChild(img);
  card.appendChild(cardOverlay);
  card.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(infoContainer);

  infoContainer.appendChild(bids);
  infoContainer.appendChild(highestBid);
  infoContainer.appendChild(created);
  infoContainer.appendChild(seller);
  cardBody.appendChild(buttonDiv);
  buttonDiv.appendChild(viewButton);
  buttonDiv.appendChild(authorButtonsContainer);
  listingWrapper.appendChild(card);
  return listingWrapper;
}

export function renderAllListingTemplates(listingDataList, parent) {
  listingDataList.forEach((listingData) => {
    const listingElement = createListingElement(listingData);
    parent.appendChild(listingElement);
  });
}

export function renderSomeListings(listingDataList, parent) {
  parent.innerHTML = "";

  const firstThreeListings = listingDataList.slice(0, 3);
  firstThreeListings.forEach((listingData) => {
    const listingElement = createListingElement(listingData);
    parent.appendChild(listingElement);
  });
}
