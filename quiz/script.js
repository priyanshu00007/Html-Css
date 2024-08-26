let questionElement = document.getElementById('question');
let option1Element = document.getElementById('option1');
let option2Element = document.getElementById('option2');
let option3Element = document.getElementById('option3');
let option4Element = document.getElementById('option4');
let resultElement = document.getElementById('result');
let timerElement = document.getElementById('timer');
let correctCounterElement = document.getElementById('correct-counter');
let incorrectCounterElement = document.getElementById('incorrect-counter');
let resultCardElement = document.getElementById('result-card');
let correctResultsElement = document.getElementById('correct-results');
let incorrectResultsElement = document.getElementById('incorrect-results');
let finalMessageElement = document.getElementById('final-message');
let playAgainButton = document.getElementById('play-again');

let questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctOption: 0
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
    correctOption: 2
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'],
    correctOption: 0
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Au', 'Hg', 'Pb'],
    correctOption: 1
  },
  {
    question: 'What is the largest living species of lizard?',
    options: ['Komodo dragon', 'Saltwater crocodile', 'Black mamba', 'African elephant'],
    correctOption: 0
  }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let timeLeft = 60; // 1 minute

document.getElementById('start-quiz').addEventListener('click', function() {
  document.getElementById('start-quiz').style.display = 'none';
  document.getElementById('question').style.display = 'block';
  document.getElementById('option1').style.display = 'block';
  document.getElementById('option2').style.display = 'block';
  document.getElementById('option3').style.display = 'block';
  document.getElementById('option4').style.display = 'block';
  document.getElementById('result').style.display = 'block';
  startGame();
});

function startGame() {
  displayQuestion();
  setInterval(updateTimer, 1000);
}

function displayQuestion() {
  questionElement.textContent = questions[currentQuestionIndex].question;
  option1Element.textContent = questions[currentQuestionIndex].options[0];
  option2Element.textContent = questions[currentQuestionIndex].options[1];
  option3Element.textContent = questions[currentQuestionIndex].options[2];
  option4Element.textContent = questions[currentQuestionIndex].options[3];
}

function checkAnswer(option) {
  if (option === questions[currentQuestionIndex].correctOption) {
    resultElement.textContent = 'Correct!';
    correctCount++;
    correctCounterElement.textContent = `Correct: ${correctCount}`;
  } else {
    resultElement.textContent = 'Incorrect!';
    incorrectCount++;
    incorrectCounterElement.textContent = `Incorrect: ${incorrectCount}`;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

function endGame() {
  resultElement.textContent = '';
  clearInterval(intervalId);
  resultCardElement.style.display = 'block';
  correctResultsElement.textContent = `Correct Answers: ${correctCount}`;
  incorrectResultsElement.textContent = `Incorrect Answers: ${incorrectCount}`;
  if (correctCount > 3) {
    finalMessageElement.textContent = 'Well Done!';
  } else {
    finalMessageElement.textContent = 'Try Again!';
  }
}

let intervalId = null;

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Time Left: ${timeLeft}`;
  if (timeLeft <= 0) {
    endGame();
  }
}

option1Element.addEventListener('click', function() {
  checkAnswer(0);
});

option2Element.addEventListener('click', function() {
  checkAnswer(1);
});

option3Element.addEventListener('click', function() {
  checkAnswer(2);
});

option4Element.addEventListener('click', function() {
  checkAnswer(3);
});

playAgainButton.addEventListener('click', function() {
  location.reload();
});
function endGame() {
    clearInterval(intervalId); // Stop the timer
    resultElement.textContent = '';
    resultCardElement.style.display = 'block';
    correctResultsElement.textContent = `Correct Answers: ${correctCount}`;
    incorrectResultsElement.textContent = `Incorrect Answers: ${incorrectCount}`;
    if (correctCount > 3) {
      finalMessageElement.textContent = 'Well Done!';
    } else {
      finalMessageElement.textContent = 'Try Again!';
    }
    timerElement.textContent = 'Time Left: 0'; // Display 0 seconds left
    timeLeft = 60; // Reset timeLeft to 60 seconds
    timerElement.style.display = 'none'; // Hide the timer
  }
  
  playAgainButton.addEventListener('click', function() {
    location.reload(); // Reload the page to start the quiz again
  });