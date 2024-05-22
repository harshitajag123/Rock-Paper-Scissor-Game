// script.js
// Get scores from local storage or initialize if not present
let humanScore = parseInt(localStorage.getItem('humanScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');

// Update scores on the screen
function updateScores() {
  humanScoreDisplay.textContent = humanScore;
  computerScoreDisplay.textContent = computerScore;
  localStorage.setItem('humanScore', humanScore);
  localStorage.setItem('computerScore', computerScore);
}

// Function to get computer's choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return 'It\'s a tie!';
  } else if ((userChoice === 'rock' && computerChoice === 'scissors') ||
             (userChoice === 'paper' && computerChoice === 'rock') ||
             (userChoice === 'scissors' && computerChoice === 'paper')) {
    return 'You win!';
  } else {
    return 'Computer wins!';
  }
}

// Function to handle the game logic when user makes a choice
function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);
  document.getElementById('message').textContent = result;

  if (result === 'You win!') {
    humanScore++;
    // Add celebration animation here
  } else if (result === 'Computer wins!') {
    computerScore++;
  }

  updateScores();
}

// Event listeners for user's choices
document.getElementById('rock').addEventListener('click', function() {
  playGame('rock');
});

document.getElementById('paper').addEventListener('click', function() {
  playGame('paper');
});

document.getElementById('scissors').addEventListener('click', function() {
  playGame('scissors');
});

// Rules popup
const rulesBtn = document.getElementById('rules-btn');
const rulesPopup = document.getElementById('rules-popup');
const closeBtn = document.querySelector('.close');

rulesBtn.addEventListener('click', function() {
  rulesPopup.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
  rulesPopup.style.display = 'none';
});

// Close the rules popup if clicked outside of it
window.addEventListener('click', function(event) {
  if (event.target === rulesPopup) {
    rulesPopup.style.display = 'none';
  }
});

// Initialize scores on page load
updateScores();
