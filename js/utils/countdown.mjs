/**
 * Calculates the remaining time until the end of an auction.
 * @param {Object} item - The auction item object containing the end time.
 * @returns {string} A string representing the remaining time in the format "Xd Xh Xm Xs".
 * If the auction has ended, returns "Ended".
 */

export function countdownTimer(item) {
  const endTime = new Date(item.endsAt).getTime();
  const now = new Date().getTime();
  let timeRemaining = endTime - now;

  // Check if the auction has ended
  if (timeRemaining <= 0) {
    return "Ended";
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  timeRemaining %= 1000 * 60 * 60 * 24;
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  timeRemaining %= 1000 * 60 * 60;
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  timeRemaining %= 1000 * 60;
  const seconds = Math.floor(timeRemaining / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
