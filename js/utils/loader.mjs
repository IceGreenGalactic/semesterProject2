export function showLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.id = "loaderContainer";

  const loader = document.createElement("div");
  loader.id = "loader";
  loaderContainer.appendChild(loader);

  document.body.appendChild(loaderContainer);
}

export function hideLoader() {
  const loaderContainer = document.getElementById("loaderContainer");
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}
