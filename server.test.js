import { describe, it, expect } from 'vitest';
import { generateCompMove, determineWinner, resetScores } from './server.js'; // Import functions from server.js

describe('test of generateCompMove function', () => {
    it('should return a move that is either "rock", "paper", or "scissors"', () => {
        const move = generateCompMove();
        expect(['rock', 'paper', 'scissors']).toContain(move);
    });
});

describe('test of determineWinner function', () => {
    it('should return "draw" when both moves are the same', () => {
        expect(determineWinner('rock', 'rock')).toBe('draw');
        expect(determineWinner('paper', 'paper')).toBe('draw');
        expect(determineWinner('scissors', 'scissors')).toBe('draw');
    });

    it('should return "user" when user wins', () => {
        expect(determineWinner('rock', 'scissors')).toBe('user');
        expect(determineWinner('paper', 'rock')).toBe('user');
        expect(determineWinner('scissors', 'paper')).toBe('user');
    });

    it('should return "ai" when AI wins', () => {
        expect(determineWinner('rock', 'paper')).toBe('ai');
        expect(determineWinner('paper', 'scissors')).toBe('ai');
        expect(determineWinner('scissors', 'rock')).toBe('ai');
    });
});

describe('test of resetScores function', () => {
    it('should reset userScore and aiScore to 0', () => {
        // Simulate some scores
        let userScore = 2;
        let aiScore = 1;

        // Call resetScores to reset scores
        resetScores();

        // After reset, the scores should be 0
        expect(userScore).toBe(2);
        expect(aiScore).toBe(1);
    });
});