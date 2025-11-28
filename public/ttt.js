// Select the message element
const messageElement = document.getElementById("message");

// Select board elements
const boardElement = document.getElementById("board");
const cells = Array.from(document.getElementsByClassName("cell"));

// Popup elements
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const popupResetButton = document.getElementById("popup-reset");

// Theme toggle
const themeToggleButton = document.getElementById("theme-toggle");

let currentPlayer = "X";  // Always start with X
let board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let gameWon = false;

// Winning conditions
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Cell click handler
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (!gameWon && board[index] !== "X" && board[index] !== "O") {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            checkWinner();
            if (!gameWon) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                messageElement.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    });
});

// Check for a winner or draw
function checkWinner() {
    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            gameWon = true;
            showPopup(`Player ${currentPlayer} wins!`);
        }
    });

    if (!gameWon && board.every(cell => cell === "X" || cell === "O")) {
        gameWon = true;
        showPopup("It's a draw!");
    }
}

function updateTurnMessage() {
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
}

// Show popup message
function showPopup(message) {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
}

// Reset game
popupResetButton.addEventListener("click", resetGame);
function resetGame() {
    board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    currentPlayer = "X";  // Start with X
    gameWon = false;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    popup.classList.add("hidden");  // Hide the popup
    updateTurnMessage(); // Reset turn message when the game starts
}

// Theme toggle functionality
themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedPreference = localStorage.getItem("darkMode") === "true";
    if (savedPreference) {
        document.body.classList.add("dark-mode");
    }
    updateTurnMessage(); // Ensure the message says "Player X's turn" when the game starts
});
