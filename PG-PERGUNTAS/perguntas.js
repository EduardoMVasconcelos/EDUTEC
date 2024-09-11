const questions = [
    {
        question: "Qual é a principal função do esqueleto humano?",
        answers: [
            { text: "Armazenamento de vitaminas essenciais", correct: true },
            { text: "Proteção dos vasos Sanguíneos", correct: false },
            { text: "Produção de energia para o corpo", correct: false },
            { text: "Regulação da temperatura corporal", correct: false }
        ]
    },
    {
        question: "Quais são os 3 tipos de músculos?",
        answers: [
            { text: "O músculos estriado esquelético, músculos não estriado cardíaco e músculos não estriado esquelético", correct: false },
            { text: "O estriado esquelético, estriado cardíaco e não estriado", correct: true },
            { text: "O músculos não estriado muscular, musculo estriado esquelético e músculo não estriatico cardíaco", correct: false },
            { text: "Músculos não estriado esquelético, músculos estriatico muscular, músculos estriatico cardíaco", correct: false }
        ]
    },
    {
        question: "Qual o principal órgão do sistema nervoso?",
        answers: [
            { text: "Cérebro", correct: true },
            { text: "Medula Espinhal", correct: false },
            { text: "Nervos Periféricos", correct: false },
            { text: "Gânglios Nervosos", correct: false }
        ]
    },
    {
        question: "Qual componente do sistema cardiovascular é responsável por transportar sangue rico em oxigênio do coração para os tecidos do corpo?",
        answers: [
            { text: "Átrios", correct: false },
            { text: "Ventrículos", correct: false },
            { text: "Capilares", correct: false },
            { text: "Artérias", correct: true }
        ]
    },
    {
        question: "Qual estrutura do sistema respiratório conecta as cavidades nasal e oral à laringe, servindo como passagem comum para o ar e alimentos?",
        answers: [
            { text: "Traqueia", correct: false },
            { text: "Laringe", correct: false },
            { text: "Brônquios", correct: false },
            { text: "Faringe", correct: true }
        ]
    },
    {
        question: "Qual órgão do sistema respiratório é responsável pela troca gasosa entre o ar inspirado e o sangue?",
        answers: [
            { text: "Laringe", correct: false },
            { text: "Traqueia", correct: false },
            { text: "Pulmões", correct: true },
            { text: "Faringe", correct: false }
        ]
    },
    {
        question: "Qual é a principal função do intestino grosso no sistema digestório?",
        answers: [
            { text: "Digestão das proteínas", correct: false },
            { text: "Absorção de água", correct: true },
            { text: "Produção de suco gástrico", correct: false },
            { text: "Digestão de carboidratos", correct: false }
        ]
    },
    {
        question: "Qual órgão é mencionado como uma glândula tanto endócrina quanto exócrina, sendo responsável pela produção de insulina e outros hormônios que regulam o nível de glicose no sangue, além de produzir líquidos digestivos para auxiliar na digestão dos alimentos?",
        answers: [
            { text: "Hipotálamo", correct: false },
            { text: "Hipófise", correct: false },
            { text: "Glândula tireoide", correct: false },
            { text: "Pâncreas", correct: true }
        ]
    },
    {
        question: "Qual dos seguintes ossos é considerado curto?",
        answers: [
            { text: "Fêmur", correct: false },
            { text: "Úmero", correct: false },
            { text: "Costelas", correct: false },
            { text: "Vértebras", correct: true }
        ]
    },
    {
        question: "Quais são as válvulas cardíacas responsáveis por controlar o fluxo sanguíneo unidirecional entre os átrios e ventrículos no coração?",
        answers: [
            { text: "Tricúspide e Pulmonar", correct: false },
            { text: "Mitral e Aórtica", correct: false },
            { text: "Aórtica e Tricúspide", correct: true },
            { text: "Pulmonar e Mitral", correct: false }
        ]
    }
]

let numeroPergunta = document.querySelector("#numero-pergunta")
let numero = 1

const contador = document.querySelector("#contador")
let intervalo

function cronometro() {
    let value = parseFloat(contador.innerHTML)
    intervalo = setInterval(() => {
        value += 0.1

        contador.innerHTML = value.toFixed(1)
    }, 100)
}

const questionElement = document.querySelector("#p-pergunta")
const answerButtons = document.querySelector(".alternativas")
const nextBtn = document.querySelector("#next-btn")

let currentQuestionIndex = 0
let score = 0
numeroPergunta.innerHTML = `${numero}/10`
let carroselCorrect

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextBtn.innerHTML = "Próximo"
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("button-pergunta")

        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
    numeroPergunta.innerHTML = `${numero++}/10`
}

function resetState() {
    nextBtn.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if (isCorrect) {
        selectedBtn.classList.add("button-pergunta-certo")
        score++
        localStorage.setItem("score", score)
        carroselCorrect = true
    } else {
        selectedBtn.classList.add("button-pergunta-errado")
        carroselCorrect = false
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("button-pergunta-certo")
        }
        button.disabled = "true"
    })
    nextBtn.style.display = "block"
    console.log(numero)
    carrosel()
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        window.location.href = "../PG-RESULTADO/resultado.html"
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

function carrosel() {
    if(currentQuestionIndex == 0) {
        let primeiroCarrosel = document.querySelector("#primeiro-carrosel")
        if(carroselCorrect == true) {
            primeiroCarrosel.classList.add("carrosel-span-certo")
        }else {
            primeiroCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 1) {
        let segundoCarrosel = document.querySelector("#segundo-carrosel")
        if(carroselCorrect == true) {
            segundoCarrosel.classList.add("carrosel-span-certo")
        }else {
            segundoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 2) {
        let terceiroCarrosel = document.querySelector("#terceiro-carrosel")
        if(carroselCorrect == true) {
            terceiroCarrosel.classList.add("carrosel-span-certo")
        }else {
            terceiroCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 3) {
        let quartoCarrosel = document.querySelector("#quarto-carrosel")
        if(carroselCorrect == true) {
            quartoCarrosel.classList.add("carrosel-span-certo")
        }else {
            quartoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 4) {
        let quintoCarrosel = document.querySelector("#quinto-carrosel")
        if(carroselCorrect == true) {
            quintoCarrosel.classList.add("carrosel-span-certo")
        }else {
            quintoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 5) {
        let sextoCarrosel = document.querySelector("#sexto-carrosel")
        if(carroselCorrect == true) {
            sextoCarrosel.classList.add("carrosel-span-certo")
        }else {
            sextoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 6) {
        let setimoCarrosel = document.querySelector("#setimo-carrosel")
        if(carroselCorrect == true) {
            setimoCarrosel.classList.add("carrosel-span-certo")
        }else {
            setimoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 7) {
        let oitavoCarrosel = document.querySelector("#oitavo-carrosel")
        if(carroselCorrect == true) {
            oitavoCarrosel.classList.add("carrosel-span-certo")
        }else {
            oitavoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 8) {
        let nonoCarrosel = document.querySelector("#nono-carrosel")
        if(carroselCorrect == true) {
            nonoCarrosel.classList.add("carrosel-span-certo")
        }else {
            nonoCarrosel.classList.add("carrosel-span-errado")
        }
    }
    if(currentQuestionIndex == 9) {
        let decimoCarrosel = document.querySelector("#decimo-carrosel")
        if(carroselCorrect == true) {
            decimoCarrosel.classList.add("carrosel-span-certo")
        }else {
            decimoCarrosel.classList.add("carrosel-span-errado")
        }
    }
}

startQuiz()
cronometro()