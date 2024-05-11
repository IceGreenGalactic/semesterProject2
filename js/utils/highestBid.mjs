export function getHighestBid(bids) {
    if (!bids || bids.length === 0) return "No bids yet";
    let highestAmount = 0;
    for (const bid of bids) {
        if (bid.amount > highestAmount) {
            highestAmount = bid.amount;
        }
    }
    return highestAmount;
}