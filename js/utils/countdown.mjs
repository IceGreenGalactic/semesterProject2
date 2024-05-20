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
