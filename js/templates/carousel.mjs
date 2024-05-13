export function createCarouselElement(media) {
  const imgCarousel = document.createElement("div");
  imgCarousel.classList.add("carousel", "slide");
  imgCarousel.setAttribute("data-bs-ride", "carousel");

  const imgCarouselInner = document.createElement("div");
  imgCarouselInner.classList.add("carousel-inner");

  // Loops through each image and creates carousel items
  media.forEach((mediaItem, index) => {
    const imgCarouselItem = document.createElement("div");
    imgCarouselItem.classList.add("carousel-item");
    if (index === 0) {
      imgCarouselItem.classList.add("active");
    }

    const img = document.createElement("img");
    img.classList.add("d-block", "w-100");
    img.src = mediaItem.url;
    img.alt = mediaItem.alt || "";

    imgCarouselItem.appendChild(img);
    imgCarouselInner.appendChild(imgCarouselItem);
  });

  imgCarousel.appendChild(imgCarouselInner);

  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#" + imgCarousel.id);
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.addEventListener("click", () => {
    const carousel = new bootstrap.Carousel(imgCarousel);
    carousel.prev();
  });

  const prevIcon = document.createElement("span");
  prevIcon.classList.add("carousel-control-prev-icon");
  prevIcon.setAttribute("aria-hidden", "true");

  const prevSr = document.createElement("span");
  prevSr.classList.add("visually-hidden");
  prevSr.textContent = "Previous";

  prevButton.appendChild(prevIcon);
  prevButton.appendChild(prevSr);

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#" + imgCarousel.id);
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.addEventListener("click", () => {
    const carousel = new bootstrap.Carousel(imgCarousel);
    carousel.next();
  });

  const nextIcon = document.createElement("span");
  nextIcon.classList.add("carousel-control-next-icon");
  nextIcon.setAttribute("aria-hidden", "true");

  const nextSr = document.createElement("span");
  nextSr.classList.add("visually-hidden");
  nextSr.textContent = "Next";

  nextButton.appendChild(nextIcon);
  nextButton.appendChild(nextSr);

  // Create indicators for image
  const indicators = document.createElement("div");
  indicators.classList.add("carousel-indicators");
  for (let i = 0; i < media.length; i++) {
    const indicator = document.createElement("button");
    indicator.setAttribute("type", "button");
    indicator.setAttribute("data-bs-target", "#" + imgCarousel.id);
    indicator.setAttribute("data-bs-slide-to", i);
    if (i === 0) {
      indicator.classList.add("active");
    }
    indicators.appendChild(indicator);
  }

  imgCarousel.appendChild(prevButton);
  imgCarousel.appendChild(nextButton);
  imgCarousel.appendChild(indicators);

  return imgCarousel;
}
