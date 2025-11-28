'use strict';

const express = require('express');
const cors = require('cors'); // Enable CORS for cross-origin requests
const app = express();
const port = 8080;

app.use(cors()); // Use CORS
app.use(express.json()); // Use built-in JSON parser (no need for body-parser)

let userScore = 0;
let aiScore = 0;
const maxScore = 3;

// Route to handle user moves
app.post('/play', (req, res) => {
    const userMove = req.body.userMove; // e.g., 'rock', 'paper', 'scissors'
    const compMove = generateCompMove();
    const result = determineWinner(userMove, compMove);

    if (result === 'user') userScore++;
    if (result === 'ai') aiScore++;

    // Check if the game has ended
    if (userScore === maxScore || aiScore === maxScore) {
        const finalResult = userScore === maxScore ? 'win' : 'lose';
        userScore = 0; // Reset scores
        aiScore = 0;
        return res.json({ result, compMove, finalResult });
    }

    res.json({ result, compMove, userScore, aiScore });
});

// Route to reset scores manually
app.post('/reset', (req, res) => {
    resetScores();
    res.json({ message: 'Scores have been reset.' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Helper functions
function generateCompMove() {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function determineWinner(userMove, compMove) {
    if (userMove === compMove) return 'draw';
    if (
        (userMove === 'rock' && compMove === 'scissors') ||
        (userMove === 'paper' && compMove === 'rock') ||
        (userMove === 'scissors' && compMove === 'paper')
    ) {
        return 'user';
    }
    return 'ai';
}

// Function to reset the scores
function resetScores() {
    let userScore = 0;
    let aiScore = 0;
}

module.exports = {
    generateCompMove,
    determineWinner,
    resetScores
};