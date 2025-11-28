// script.js
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const cardGrid = document.querySelector('.card-grid');
const movesCounter = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');
const gameOverModal = document.getElementById('game-over-modal');
const finalMoves = document.getElementById('final-moves');
const playAgainBtn = document.getElementById('play-again-btn');

const winModal = document.getElementById('win-modal');

// Define icons or symbols for the cards
const icons = ['🍎', '🍌', '🍒', '🍇', '🍍', '🥝', '🍉', '🍋'];

// Generate card deck (icons repeated twice)
let deck = [...icons, ...icons];
let moves = 0;
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Restart game when "Play Again" button is clicked
playAgainBtn.addEventListener('click', () => {
    initGame(); // Reset and start the game again
  });
  
  // Hide the game-over modal in `initGame`
  function initGame() {
    cardGrid.innerHTML = ''; // Clear the grid
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    movesCounter.textContent = moves; // Reset moves display
    deck = shuffle(deck); // Shuffle the deck
    createCards(); // Create the cards
    // Make sure the modal is hidden
    gameOverModal.classList.add('hidden'); // Hide the game over modal
  }
  
  // Ensure modal is truly hidden in CSS
  
  

// Create card elements
function createCards() {
  deck.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = icon;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    cardGrid.appendChild(card);

    card.addEventListener('click', () => flipCard(cardInner, icon));
  });
}

// Flip card logic
function flipCard(cardInner, icon) {
  if (cardInner.classList.contains('flip') || flippedCards.length === 2) return;

  cardInner.classList.add('flip');
  flippedCards.push({ cardInner, icon });

  if (flippedCards.length === 2) checkMatch();
}

// Check for a match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.icon === card2.icon) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === icons.length) endGame();
  } else {
    setTimeout(() => {
      card1.cardInner.classList.remove('flip');
      card2.cardInner.classList.remove('flip');
      flippedCards = [];
    }, 1000);
  }
  updateMoves();
}

// Update moves
function updateMoves() {
  moves++;
  movesCounter.textContent = moves;
}

// End game
function endGame() {
  finalMoves.textContent = moves;
  gameOverModal.classList.remove('hidden'); // Show the modal
}

// Restart game when restart button is clicked
restartBtn.addEventListener('click', initGame);

// Restart game when "Play Again" button is clicked
playAgainBtn.addEventListener('click', () => {
  // Reset and start the game again
  initGame();
  // Hide the game over modal (in case it's still showing)
  gameOverModal.classList.add('hidden');
});
// Start game on "Start" button click
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameContainer.classList.remove('hidden');
  initGame();
});
// Start the game on load
initGame();
