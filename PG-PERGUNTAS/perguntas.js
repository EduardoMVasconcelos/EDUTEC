const questions = [
    {
        question: "Qual é a principal função do esqueleto humano?",
        answers: [
            {text: "Armazenamento de vitaminas essenciais", correct: true},
            {text: "Armazenamento de vitaminas", correct: false},
            {text: "Armazenamento de essenciais", correct: false},
            {text: "Armazenamento de", correct: false}
        ]
    },
    {
        question: "Qual osso",
        answers: [
            {text: "femur", correct: false},
            {text: "osso", correct: false},
            {text: "mao", correct: true},
            {text: "cranio", correct: false}
        ]
    }
]

let numeroPergunta = document.querySelector("#numero-pergunta")
let numero = 1


const questionElement = document.querySelector("#p-pergunta")
const answerButtons = document.querySelector(".alternativas")
const nextBtn = document.querySelector("#next-btn")

let currentQuestionIndex = 0
let score = 0
numeroPergunta.innerHTML = `${numero}/10`

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextBtn.innerHTML = "Next"
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
    while(answerButtons.firstChild) {
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
    }else {
        selectedBtn.classList.add("button-pergunta-errado")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("button-pergunta-certo")
        }
        button.disabled = "true"
    })
    nextBtn.style.display = "block"
    console.log(numero)
}

function handleNextButton() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    }else {
        window.location.href = "../PG-RESULTADO/resultado.html"
    }
}

nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
       handleNextButton() 
    }else {
        startQuiz()
    }
})

startQuiz()