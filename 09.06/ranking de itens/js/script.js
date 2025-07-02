const listaFavoritos = document.getElementById("listaFavoritos");
const toggleTheme = document.getElementById("toggleTheme");
let itens = [
    "Babymonster",
    "Blackpink",
    "I-dle",
    "Fifty Harmony",
    "New Jeans (NJZ)",
    "Meovv",
    "Katseye",
    "Illit",
    "BTS",
    "Enhypen",
];
function renderizarLista() {
    listaFavoritos.innerHTML = "";
    itens.forEach((item,index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${item}</span>
     <div class="botoes">
        <button onclick="mover(${index}, -1)">⬆️</button>
        <button onclick="mover(${index}, -1)">⬇️</button>
    </div>
    `;
    listaFavoritos.appendChild(li);
    });
}
function mover(index,direcao) {
    const novoIndex = index + direcao;
    if (novoIndex < 0 || novoIndex >= itens.lenght) return;
    [itens[index], itens[novoIndex]] = [itens[novoIndex], itens[index]];
    renderizarLista();
}
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleTheme.textContent =
    document.body.classList.contains("dark") ? "🩷" : "💜";
});
renderizarLista();