document.getElementById("registerForm").addEventListener("submit", async (e) => {
    // Impede o comportamento padrão de recarregar a página ao enviar o formulário
    e.preventDefault();

    // Obtém o valor do campo de entrada de nome de usuário
    const username = document.getElementById("registerUsername").value;
    // Obtém o valor do campo de entrada de senha
    const password = document.getElementById("registerPassword").value;

    try {
        // Faz uma requisição POST para o endpoint de cadastro na API
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST", // Método HTTP para envio de dados
            headers: { "Content-Type": "application/json" }, // Define o cabeçalho do tipo de conteúdo como JSON
            body: JSON.stringify({ username, password }) // Converte os dados do usuário para uma string JSON e os inclui no corpo da requisição
        });

        // Verifica se a resposta da API indica sucesso (status HTTP 200 ou 201)
        if (response.ok) {
            // Exibe uma mensagem de sucesso para o usuário
            alert("Cadastro realizado com sucesso!");
            // Redireciona para a página de login
            window.location.href = "index.html";
        } else {
            // Se houver erro, extrai a mensagem de erro do corpo da resposta e a exibe em um alerta
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        // Caso ocorra um erro na requisição, exibe o erro no console para análise
        console.error("Erro:", error);
    }
});