import React, { useState, useEffect, useCallback } from 'react';

const ROWS = 20;
const COLS = 10;
const SHAPES = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]], // L
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
];

function getRandomShape() {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    return shape;
}

function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function Tetris() {
    const [board, setBoard] = useState(createBoard());
    const [shape, setShape] = useState(getRandomShape());
    const [pos, setPos] = useState({ row: 0, col: 3 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const mergeShape = useCallback((b, s, p) => {
        const newBoard = b.map(row => [...row]);
        s.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell && p.row + r >= 0 && p.row + r < ROWS && p.col + c >= 0 && p.col + c < COLS) {
                    newBoard[p.row + r][p.col + c] = cell;
                }
            });
        });
        return newBoard;
    }, []);

    const isValid = useCallback((b, s, p) => {
        for (let r = 0; r < s.length; r++) {
            for (let c = 0; c < s[r].length; c++) {
                if (s[r][c]) {
                    const row = p.row + r;
                    const col = p.col + c;
                    if (row < 0 || row >= ROWS || col < 0 || col >= COLS || b[row][col]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }, []);

    const rotate = useCallback((s) => {
        return s[0].map((_, i) => s.map(row => row[i])).reverse();
    }, []);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            const nextPos = { row: pos.row + 1, col: pos.col };
            if (isValid(board, shape, nextPos)) {
                setPos(nextPos);
            } else {
                const newBoard = mergeShape(board, shape, pos);
                // Check for completed lines
                let lines = 0;
                const filtered = newBoard.filter(row => {
                    if (row.every(cell => cell)) {
                        lines++;
                        return false;
                    }
                    return true;
                });
                while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(0));
                setBoard(filtered);
                setScore(s => s + lines * 100);
                // New shape
                const newShape = getRandomShape();
                const newPos = { row: 0, col: 3 };
                if (!isValid(filtered, newShape, newPos)) {
                    setGameOver(true);
                } else {
                    setShape(newShape);
                    setPos(newPos);
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [board, shape, pos, isValid, mergeShape, gameOver]);

    useEffect(() => {
        const handleKey = (e) => {
            if (gameOver) return;
            let nextPos = { ...pos };
            let nextShape = shape;
            if (e.key === 'ArrowLeft') nextPos.col--;
            if (e.key === 'ArrowRight') nextPos.col++;
            if (e.key === 'ArrowDown') nextPos.row++;
            if (e.key === 'ArrowUp') {
                const rotated = rotate(shape);
                if (isValid(board, rotated, pos)) nextShape = rotated;
            }
            if (isValid(board, nextShape, nextPos)) {
                setPos(nextPos);
                setShape(nextShape);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [pos, shape, board, isValid, rotate, gameOver]);

    const displayBoard = mergeShape(board, shape, pos);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Tetris Game</h1>
            <div className="tetris-board">
                {displayBoard.map((row, r) =>
                    row.map((cell, c) => (
                        <div key={r + '-' + c} className={cell ? 'cell active' : 'cell'} />
                    ))
                )}
            </div>
            <div className="score">Score: {score}</div>
            {gameOver && <div style={{ color: 'red', marginTop: '10px' }}>Game Over</div>}
        </div>
    );
}

export default Tetris;
