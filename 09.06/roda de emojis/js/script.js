const emojiDisplay = document.getElementById("emojiDisplay");
const girarBtn = document.getElementById("girarBtn");
const toggleTheme = document.getElementById("toggleTheme");

const emojis = [
    "😀", "😁", "😏", "🥰", "😴", "🤭", "😒", "😘", "🤯", "🤡",
    "🐒", "🦄", "🐧", "🦙", "🦩", "🐞", "🕷️", "🐼", "🦥", "🐑"
];

function girarEmoji() {
    emojiDisplay.classList.add("girando");
    let tempo = 1000 + Math.random() * 1000;
    let intervalo;
    let i = 0;

    intervalo = setInterval (() => {
        emojiDisplay.textContent = emojis[i % emojis.length];
        i++;
    }, 100);

    setTimeout (() => { 
        clearInterval(intervalo);
        emojiDisplay.classList.remove("girando");
        const sorteado = emojis[Math.floor(Math.random() * emojis.length)];
        emojiDisplay.textContent = sorteado;
    }, tempo);
}
girarBtn.addEventListener("click", girarEmoji);

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});