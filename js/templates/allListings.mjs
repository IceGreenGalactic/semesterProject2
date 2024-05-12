import { getHighestBid } from "../utils/highestBid.mjs";

import { countdownTimer } from "../utils/countdown.mjs";



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
  timerSpan.classList.add("headline-text");
  timerSpan.setAttribute("id", "timer");
  timerSpan.textContent = countdownTimer(item);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "m-auto");
  const title = document.createElement("h3");
  title.classList.add("card-title", "text-center");
  title.textContent = item.title;

  const infoContainer = document.createElement("p");
  infoContainer.classList.add("div");
  const bids = document.createElement("p");
  bids.textContent = `Bids: ${item._count.bids}`;
  const highestBid = document.createElement("p");
  highestBid.textContent = `Highest Bid: ${getHighestBid(item.bids)}`;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("text-center", "mt-2");
  const viewButton = document.createElement("button");
  viewButton.classList.add("btn", "btn-primary", "btn-sm", "py-0", "my-2");
  
  viewButton.textContent = "View Listing";

 
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

export async function renderSingleListingTemplate(listingData, parent) {
  try {
    const listingElement = createListingElement(listingData);
    if (listingElement) {
      const existingListingElement = parent.querySelector(`[data-listing-id="${listingData.id}"]`);
      if (existingListingElement) {
       
        existingListingElement.replaceWith(listingElement);
      } else {
        // Otherwise, append the new listing element
        parent.appendChild(listingElement);
      }
    }
  } catch (error) {
    console.error("Error rendering listing template:", error);
  }
}
