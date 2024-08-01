const dropdown = document.querySelector(".dropdown")
const menu = document.querySelector(".menu")

dropdown.onclick = () => {
    menu.classList.toggle("ativo")
}