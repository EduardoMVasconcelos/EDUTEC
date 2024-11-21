const dropdown = document.querySelector(".dropdown")
const menu = document.querySelector(".menu")

dropdown.onclick = () => {
    menu.classList.toggle("ativo")
}

function login() {
    const login = document.querySelector(".login")
    login.classList.add(ativado)
}