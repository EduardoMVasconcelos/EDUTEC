export async function getName() {
    const token = localStorage.getItem("token")

    if (!token) {
        console.log(error)
        return
    }

    const response = await fetch("http://localhost:3000/getname", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then(response => response.json())

    return response.name
}