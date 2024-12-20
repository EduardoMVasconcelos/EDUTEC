import { verifyToken } from "../utils/verify-token.js"
import { getName } from "../utils/get-name.js"
import { logout } from "../utils/logout.js"

const url = "../PG-LOGIN/login.html"

verifyToken(url)

const name = await getName()
logout()

const nameP = document.querySelector(".pg p")
nameP.innerText = `Seja bem vindo ao nosso quiz ${name}`

document.getElementById("button-jogar").onclick = function () {
    location.href = "../PG-PERGUNTAS/perguntas.html";
};