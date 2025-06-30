const spinner = document.getElementById("uploadSpinner");
const emoji = document.getElementById("spinnerEmoji");
const emojiOptions = ["💅", "🍑", "💦", "🍆", "🥵", "❤️‍🔥", "💋"];
let emojiInterval;

function startLoadSpinner() {
  // Show loading spinner
  spinner.style.display = "flex";

  // Change emoji every 300ms
  emojiInterval = setInterval(() => {
    const nextEmoji =
      emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    emoji.textContent = nextEmoji;
  }, 300);
}

function stopLoadSpinner() {
  // Clean up loader
  clearInterval(emojiInterval);
  spinner.style.display = "none";
}
