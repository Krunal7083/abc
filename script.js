/* script.js */
const questions = [
  { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5"], correctAnswer: "4" },
  { id: 2, text: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata"], correctAnswer: "Delhi" },
  { id: 3, text: "What is 5 x 3?", options: ["15", "10", "20"], correctAnswer: "15" },
  { id: 4, text: "Which planet is known as the Red Planet?", options: ["Mars", "Earth", "Venus"], correctAnswer: "Mars" },
  { id: 5, text: "What is the square root of 16?", options: ["4", "8", "2"], correctAnswer: "4" },
];

let currentQuestion = null;
let usedQuestions = [];
let selectedAnswer = null;
let score = 0;

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const feedbackDiv = document.getElementById("feedback");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");
const restartBtn = document.getElementById("restart");
const scoreDisplay = document.getElementById("score");

function getRandomQuestion() {
  const remaining = questions.filter(q => !usedQuestions.includes(q.id));
  if (remaining.length === 0) return null;
  const random = remaining[Math.floor(Math.random() * remaining.length)];
  usedQuestions.push(random.id);
  return random;
}

function renderQuestion() {
  currentQuestion = getRandomQuestion();
  if (!currentQuestion) {
    questionDiv.innerText = "Quiz Complete!";
    optionsDiv.innerHTML = "";
    feedbackDiv.innerText = Final Score: ${score} / ${questions.length};
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    return;
  }
  questionDiv.innerText = currentQuestion.text;
  optionsDiv.innerHTML = "";
  currentQuestion.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      selectedAnswer = opt;
      submitBtn.disabled = false;
      Array.from(optionsDiv.children).forEach(b => b.disabled = true);
      btn.classList.add("selected");
    };
    optionsDiv.appendChild(btn);
  });
  feedbackDiv.innerText = "";
  submitBtn.disabled = true;
  submitBtn.style.display = "inline-block";
  nextBtn.style.display = "none";
}

submitBtn.onclick = () => {
  if (selectedAnswer === currentQuestion.correctAnswer) {
    score++;
    feedbackDiv.innerText = "✅ Correct!";
  } else {
    feedbackDiv.innerText = ❌ Incorrect. The correct answer was ${currentQuestion.correctAnswer};
  }
  scoreDisplay.innerText = Score: ${score};
  submitBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
};

nextBtn.onclick = () => {
  selectedAnswer = null;
  renderQuestion();
};

restartBtn.onclick = () => {
  score = 0;
  usedQuestions = [];
  selectedAnswer = null;
  quizFinished = false;
  scoreDisplay.innerText = Score: ${score};
  restartBtn.style.display = "none";
  renderQuestion();
};

// Start quiz
renderQuestion();
