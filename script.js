const questions = [
  {
    question: "Which HTML tag is used to include JavaScript code?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<code>", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Syntax", correct: false },
      { text: "Colorful Style Setup", correct: false },
    ],
  },
  {
    question: "Which method is used to add an element at the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "shift()", correct: false },
      { text: "unshift()", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the CSS?",
    answers: [
      { text: "<style>", correct: true },
      { text: "<link>", correct: false },
      { text: "<css>", correct: false },
      { text: "<design>", correct: false },
    ],
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Netscape", correct: true },
      { text: "Google", correct: false },
      { text: "Apple", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score");
const quizContainer = document.getElementById("quiz-container");
const restartBtn = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, answer) {
  const correct = answer.correct;
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.innerText ===
      questions[currentQuestionIndex].answers.find((a) => a.correct).text) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerText = `${score} / ${questions.length}`;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextButton.addEventListener("click", () => {
  handleNextButton();
});

restartBtn.addEventListener("click", () => {
  resultBox.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  startQuiz();
});

startQuiz();
