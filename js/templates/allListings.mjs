import { countdownTimer } from "../utils/countdown.mjs";
import { storeScrollPosition } from "../utils/scroll/scrollPosition.mjs";

export function createListingElement(item) {
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
  const title = document.createElement("h3");
  title.classList.add("card-title", "headline-text", "text-center");
  title.textContent = item.title;

  const infoContainer = document.createElement("p");
  infoContainer.classList.add("div");
  const created = document.createElement("p");
  created.textContent = `Created: ${new Date(item.created).toDateString()}`;
  const bids = document.createElement("p");
  bids.textContent = `Bids: ${item._count.bids}`;

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

  cardOverlay.appendChild(overlayInner);
  overlayInner.appendChild(timerTitle);
  overlayInner.appendChild(timerSpan);
  card.appendChild(img);
  card.appendChild(cardOverlay);
  card.appendChild(cardBody);
  cardBody.appendChild(title);
  cardBody.appendChild(infoContainer);
  infoContainer.appendChild(bids);
  infoContainer.appendChild(created);
  cardBody.appendChild(buttonDiv);
  buttonDiv.appendChild(viewButton);
  listingWrapper.appendChild(card);
  return listingWrapper;
}

export function renderAllListingTemplates(listingDataList, parent) {
  parent.innerHTML = "";
  listingDataList.forEach((listingData) => {
    const listingElement = createListingElement(listingData);
    parent.appendChild(listingElement);
  });
}

export function renderSomeListings(listingDataList, parent) {
  parent.innerHTML = "";
  const sortedListings = listingDataList.sort((a, b) => new Date(b.created) - new Date(a.created));
  const firstThreeListings = sortedListings.slice(0, 3);
  firstThreeListings.forEach((listingData) => {
    const listingElement = createListingElement(listingData);
    parent.appendChild(listingElement);
  });
}
