let numeroPergunta = document.querySelector("#numero-pergunta")
let numero = 1
numeroPergunta.innerHTML = `${numero}/10`

async function buscarPerguntas() {
    const urlDados = "../data.json"

    // await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
    //     dados.quizzes.forEach(dado => {
    //         if (dado.title === assunto) {
    //             quiz = dado
    //         }
    //     })
    // })
    console.log(quiz)
}


function montarPerguntas() {
    let divAlternativas = document.querySelector(".alternativas")
    divAlternativas.innerHTML = `
    <div class="alternativa1">
        <button class="button-alternativa"><p class="p-button">A</p></button>
        <button class="button-pergunta" id="botao-um"><p class="p-alternativa">Armazenamento de vitaminas essenciais</p></button>
    </div>

    <div class="alternativa2">
        <button class="button-alternativa"><p class="p-button">B</p></button>
        <button class="button-pergunta" id="botao-dois"><p class="p-alternativa">Proteção dos vasos Sanguíneos</p></button>
    </div>

    <div class="alternativa3">
        <button class="button-alternativa"><p class="p-button">C</p></button>
        <button class="button-pergunta" id="botao-tres"><p class="p-alternativa">Produção de energia para o corpo</p></button>
    </div>

    <div class="alternativa4">
        <button class="button-alternativa"><p class="p-button">D</p></button>
        <button class="button-pergunta" id="botao-quatro"><p class="p-alternativa">Regulação da temperatura corporal</p></button>
    </div>`
}

montarPerguntas()