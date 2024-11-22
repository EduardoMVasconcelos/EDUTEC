function register() {
    const name = document.querySelector("#name").value 
    const email = document.querySelector("#email").value 
    const password = document.querySelector("#password").value 
    const passwordConfirmation = document.querySelector("#password-Confirmation").value 

    if(name === "" || email === "" || password === "" || passwordConfirmation === "") {
        alert("Preencha todas as informações")
        return
    }

    if(password !== passwordConfirmation) {
        alert("As senhas não conferem")
        document.querySelector("#password").value = ""
        document.querySelector("#password-Confirmation").value = ""
        return
    }

    const user = {
        name,
        email,
        password
    }
}

const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})