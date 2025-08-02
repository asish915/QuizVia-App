const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score-display');
const questionNumber = document.getElementById('question-number');
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const finalScore = document.getElementById('final-score');
const typingText = document.getElementById('typing-text');

let currentQuestionIndex = 0;
let score = 0;

const welcomeMessage = "Test your knowledge and become smarter every question!";

function typeWriter(text, element, i = 0) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, element, i + 1), 40);
  }
}

typeWriter(welcomeMessage, typingText);

startButton.addEventListener('click', () => {
  introScreen.classList.add('hide');
  quizScreen.classList.remove('hide');
  startQuiz();
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion(){
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    questionNumber.textContent =`Question ${currentQuestionIndex + 1}/${questions.length}`;
  } else {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');
    finalScore.textContent = `Your Score: ${score} / ${questions.length}`;
  }
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  setStatusClass(selectedButton, correct);
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  if (correct) score++;
  scoreDisplay.textContent = `Score: ${score}`;
  nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats", correct: false }
    ]
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "Who is the PM of India?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Amit Shah", correct: false },
      { text: "Yogi Adityanath", correct: false }
    ]
  },
  {
    question: "What is 15 x 3?",
    answers: [
      { text: "45", correct: true },
      { text: "35", correct: false },
      { text: "25", correct: false },
      { text: "50", correct: false }
    ],
  },
];
