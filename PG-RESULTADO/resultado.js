let resultado = document.querySelector("#resultado")
let numeroResultado = 7
resultado.innerHTML = `Você acertou ${numeroResultado}/12 de questões`

document.querySelector("#reiniciar").onclick = () => {
    location.href = "../PG-PERGUNTAS/perguntas.html"
}

document.querySelector("#inicio").onclick = () => {
    location.href = "../index.html"
}