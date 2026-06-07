const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Transfer Machine Language", correct: false },
            { text: "Hyper Transfer Mark Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which language is used for web interactivity?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("btn");

        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){

    nextButton.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){

    const selectedBtn = e.target;

    const correct = selectedBtn.dataset.correct === "true";

    if(correct){
        score++;
    }

    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.style.background = "green";
        }else{
            button.style.background = "red";
        }

        button.disabled = true;

    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        questionElement.innerHTML =
        `Quiz Finished! Your Score: ${score}/${questions.length}`;

        answerButtons.innerHTML = "";

        nextButton.style.display = "none";
    }

});

startQuiz();