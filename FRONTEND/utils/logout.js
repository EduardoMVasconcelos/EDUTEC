export function logout() {
    const button = document.querySelector(".logout")
    button.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.reload()
    })
}