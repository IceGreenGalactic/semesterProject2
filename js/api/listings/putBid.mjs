import { listingsEndpoint } from "../api_constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { showMessage } from "../../utils/messages.mjs";

export async function placeBid(auctionId, bidAmount, updateBidUI) {
  const url = `${listingsEndpoint}/${auctionId}/bids`;
  const amount = parseInt(bidAmount, 10); // Ensure the bid amount is an integer

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

      // Use the amount and update the UI
      if (updateBidUI) {
        const highestBid = amount;
        const bidCount = responseData.data._count.bids || 0;
        updateBidUI(highestBid, bidCount + 1); // Increment bid count by 1
      }

      return responseData;
    } else {
      console.error("Failed to place bid:", response.status, response.statusText);
      showMessage(`Failed to place bid: ${response.status} ${response.statusText}`, "error");
    }
  } catch (error) {
    console.error("Error placing bid:", error);
    showMessage("Error placing bid. Please try again.", "error");
  }
}
