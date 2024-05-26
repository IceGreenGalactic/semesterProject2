import { listingsEndpoint } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function placeBid(auctionId, bidAmount, updateBidUI) {
  const url = `${listingsEndpoint}/${auctionId}/bids`;
  const amount = parseInt(bidAmount, 10);

  if (isNaN(amount) || amount <= 0) {
    showMessage("Invalid bid amount. Please enter a valid number.", "error");
    return;
  }

  const body = { amount };

  try {
    const response = await authFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Bid placed successfully:", responseData);
      showMessage("Bid placed successfully!", "success");

      if (updateBidUI) {
        const highestBid = amount;
        const bidCount = responseData.data._count.bids || 0;
        updateBidUI(highestBid, bidCount);
      }

      return responseData;
    } else {
      const errorResponse = await response.json();
      if (errorResponse.errors && errorResponse.errors.length > 0) {
        const errorMessage = errorResponse.errors[0].message;
        if (errorMessage === "Your bid must be higher than the current bid") {
          showMessage("Your bid is too low. Please enter a higher amount.", "error");
        } else {
          showMessage(`Failed to place bid: ${errorMessage}`, "error");
        }
      } else {
        console.error("Failed to place bid:", response.status, response.statusText);
        showMessage(`Failed to place bid: ${response.status} ${response.statusText}`, "error");
      }
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    showMessage("Error placing bid. Please try again.", "error");
  }
}
