export async function fetchRanking() {
    try {
        const response = await fetch("http://localhost:3000/api/ranking", {
            headers: { "Authorization": token } // Cabeçalho de autorização com token JWT
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const rankingData = await response.json();
            const rankingTable = document.getElementById("rankingTable");
            const tbody = rankingTable.querySelector("tbody");

            // Limpa a tabela antes de preenchê-la com novos dados
            tbody.innerHTML = "";

            // Preenche a tabela com os dados de ranking
            rankingData.forEach((item) => {
                const row = document.createElement("tr"); // Cria uma nova linha para a tabela
                const usernameCell = document.createElement("td"); // Célula para o nome do usuário
                const scoreCell = document.createElement("td"); // Célula para a pontuação

                usernameCell.textContent = item.username; // Insere o nome do usuário
                scoreCell.textContent = item.score; // Insere a pontuação

                row.appendChild(usernameCell); // Adiciona a célula do nome à linha
                row.appendChild(scoreCell); // Adiciona a célula da pontuação à linha
                tbody.appendChild(row); // Adiciona a linha completa à tabela
            });

            rankingTable.style.display = "table"; // Exibe a tabela de ranking
        } else {
            alert("Erro ao buscar o ranking."); // Exibe erro se a busca falhar
        }
    } catch (error) {
        console.error("Erro:", error); // Exibe erros no console
    }
}