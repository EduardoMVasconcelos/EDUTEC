import { fetchRanking } from "../utils/save-score.js"
fetchRanking()

let resultado = document.querySelector("#resultado")
let numeroResultado = 7
resultado.innerHTML = `Você acertou ${localStorage.getItem("score")}/10 de questões`

document.querySelector("#reiniciar").onclick = () => {
    location.href = "../PG-PERGUNTAS/perguntas.html"
}

document.querySelector("#inicio").onclick = () => {
    location.href = "../index.html"
}

const buttonRanking = document.querySelector("#ranking")
buttonRanking.addEventListener("click", () => {
    window.location.href = "../PG-RANKING/ranking.html"
})