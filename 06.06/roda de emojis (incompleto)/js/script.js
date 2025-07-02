const emojiDisplay = document.getElementById("emojiDisplay");
const girarBtn = document.getElementById("girarBtn");
const toggleTheme = document.getElementById("toggleTheme");

const emojis = [
    "😀", "😁", "😏", "🥰", "😴", "🤭", "😒", "😘", "🤯", "🤡",
    "🐒", 🦄🐧🦙🦩🐞🕷️
]

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});