// Get scores from local storage or initialize if not present
let humanScore = parseInt(localStorage.getItem('humanScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
const computerScoreDisplay = document.getElementById('score1');
const humanScoreDisplay = document.getElementById('score2');
const nextBtn = document.getElementById('next-button');

// Update scores on the screen
function updateScores() {
  if (humanScoreDisplay) humanScoreDisplay.textContent = humanScore;
  if (computerScoreDisplay) computerScoreDisplay.textContent = computerScore;
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
    return 'YOU WIN';
  } else {
    return 'YOU LOST!';
  }
}

// Function to handle the game logic when user makes a choice
function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(userChoice, computerChoice);

  // Store results in localStorage
  localStorage.setItem('lastUserChoice', userChoice);
  localStorage.setItem('lastComputerChoice', computerChoice);
  localStorage.setItem('lastResult', result);

  if (result === 'YOU WIN') {
    humanScore++;
  } else if (result === 'YOU LOST!') {
    computerScore++;
  }

  updateScores();

  // Redirect to gamePage.html
  window.location.href = 'gamePage.html';
}

// Event listeners for user's choices
document.getElementById('rock-img')?.addEventListener('click', function() {
  playGame('rock');
});

document.getElementById('paper-img')?.addEventListener('click', function() {
  playGame('paper');
});

document.getElementById('scissor-img')?.addEventListener('click', function() {
  playGame('scissors');
});

// Initialize scores on page load
updateScores();

// Load data on gamePage.html
if (window.location.pathname.endsWith('gamePage.html')) {
  const lastUserChoice = localStorage.getItem('lastUserChoice');
  const lastComputerChoice = localStorage.getItem('lastComputerChoice');
  const lastResult = localStorage.getItem('lastResult');

  document.querySelector('.u-picked img').src = `images/${lastUserChoice.charAt(0).toUpperCase() + lastUserChoice.slice(1)}.png`;
  document.querySelector('.pc-picked img').src = `images/${lastComputerChoice.charAt(0).toUpperCase() + lastComputerChoice.slice(1)}.png`;
  document.getElementById('message').textContent = lastResult;
  
  if (lastResult === 'YOU WIN') {
    nextBtn.style.display = 'inline-block'; // Show the Next button
  } else {
     nextBtn.style.display = 'none'; //Hide the Next button
  }
}

// Rules popup
const rulesBtn = document.getElementById('rules-btn');
const rulesPopup = document.getElementById('rules-popup');
const closeBtn = document.querySelector('.close');

rulesBtn?.addEventListener('click', function() {
  rulesPopup.style.display = 'flex';
});

closeBtn?.addEventListener('click', function() {
  rulesPopup.style.display = 'none';
});

// Close the rules popup if clicked outside of it
window.addEventListener('click', function(event) {
  if (event.target === rulesPopup) {
    rulesPopup.style.display = 'none';
  }
});


