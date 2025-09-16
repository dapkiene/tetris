import React, { useState, useEffect, useCallback } from 'react';

const ROWS = 20;
const COLS = 10;
const SHAPES = [
    { shape: [[1, 1, 1, 1]], color: 1 }, // I - Cyan
    { shape: [[1, 1], [1, 1]], color: 2 }, // O - Yellow
    { shape: [[0, 1, 0], [1, 1, 1]], color: 3 }, // T - Purple
    { shape: [[1, 0, 0], [1, 1, 1]], color: 4 }, // J - Blue
    { shape: [[0, 0, 1], [1, 1, 1]], color: 5 }, // L - Orange
    { shape: [[1, 1, 0], [0, 1, 1]], color: 6 }, // S - Green
    { shape: [[0, 1, 1], [1, 1, 0]], color: 7 }, // Z - Red
];

function getRandomShape() {
    const shapeObj = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const rotations = Math.floor(Math.random() * 4);
    let rotatedShape = shapeObj.shape;

    // Apply random rotations
    for (let i = 0; i < rotations; i++) {
        rotatedShape = rotatedShape[0].map((_, index) =>
            rotatedShape.map(row => row[index]).reverse()
        );
    }

    return { shape: rotatedShape, color: shapeObj.color };
}

function createBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function Tetris() {
    const [board, setBoard] = useState(createBoard());
    const [currentPiece, setCurrentPiece] = useState(getRandomShape());
    const [pos, setPos] = useState({ row: 0, col: 3 });
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [lastFireworkScore, setLastFireworkScore] = useState(0);

    const getFallSpeed = useCallback(() => {
        return Math.max(100, 500 - Math.floor(score / 100) * 50);
    }, [score]);

    const restartGame = () => {
        setBoard(createBoard());
        setCurrentPiece(getRandomShape());
        setPos({ row: 0, col: 3 });
        setScore(0);
        setGameOver(false);
        setShowFireworks(false);
        setLastFireworkScore(0);
    };

    const mergeShape = useCallback((b, piece, p) => {
        const newBoard = b.map(row => [...row]);
        piece.shape.forEach((row, r) => {
            row.forEach((cell, c) => {
                if (cell && p.row + r >= 0 && p.row + r < ROWS && p.col + c >= 0 && p.col + c < COLS) {
                    newBoard[p.row + r][p.col + c] = piece.color;
                }
            });
        });
        return newBoard;
    }, []);

    const isValid = useCallback((b, piece, p) => {
        for (let r = 0; r < piece.shape.length; r++) {
            for (let c = 0; c < piece.shape[r].length; c++) {
                if (piece.shape[r][c]) {
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

    const rotate = useCallback((piece) => {
        const rotatedShape = piece.shape[0].map((_, i) => piece.shape.map(row => row[i])).reverse();
        return { ...piece, shape: rotatedShape };
    }, []);

    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            const nextPos = { row: pos.row + 1, col: pos.col };
            if (isValid(board, currentPiece, nextPos)) {
                setPos(nextPos);
            } else {
                const newBoard = mergeShape(board, currentPiece, pos);
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
                const newScore = score + lines * 100;
                setScore(newScore);

                // Check for fireworks trigger
                if (Math.floor(newScore / 500) > Math.floor(lastFireworkScore / 500)) {
                    setShowFireworks(true);
                    setLastFireworkScore(newScore);
                    setTimeout(() => setShowFireworks(false), 2000);
                }

                // New shape
                const newPiece = getRandomShape();
                const newPos = { row: 0, col: 3 };
                if (!isValid(filtered, newPiece, newPos)) {
                    setGameOver(true);
                } else {
                    setCurrentPiece(newPiece);
                    setPos(newPos);
                }
            }
        }, getFallSpeed());
        return () => clearInterval(interval);
    }, [board, currentPiece, pos, isValid, mergeShape, gameOver, score, lastFireworkScore, getFallSpeed]);

    useEffect(() => {
        const handleKey = (e) => {
            if (gameOver) return;
            let nextPos = { ...pos };
            let nextPiece = currentPiece;
            if (e.key === 'ArrowLeft') nextPos.col--;
            if (e.key === 'ArrowRight') nextPos.col++;
            if (e.key === 'ArrowDown') nextPos.row++;
            if (e.key === 'ArrowUp' || e.key === 'Control') {
                const rotated = rotate(currentPiece);
                if (isValid(board, rotated, pos)) nextPiece = rotated;
            }
            if (isValid(board, nextPiece, nextPos)) {
                setPos(nextPos);
                setCurrentPiece(nextPiece);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [pos, currentPiece, board, isValid, rotate, gameOver]);

    const displayBoard = mergeShape(board, currentPiece, pos);

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <h1>Tetris Game</h1>
            <div className="game-container">
                <div className="controls-panel">
                    <h3>🎮 Controls</h3>
                    <div className="control-item">
                        <span className="key">←</span>
                        <span className="action">Move Left</span>
                    </div>
                    <div className="control-item">
                        <span className="key">→</span>
                        <span className="action">Move Right</span>
                    </div>
                    <div className="control-item">
                        <span className="key">↓</span>
                        <span className="action">Move Down</span>
                    </div>
                    <div className="control-item">
                        <span className="key">↑</span>
                        <span className="action">Rotate</span>
                    </div>
                    <div className="control-item">
                        <span className="key">Ctrl</span>
                        <span className="action">Rotate</span>
                    </div>
                    
                    <h3>🎯 Game Info</h3>
                    <div className="info-item">
                        <span className="label">Speed:</span>
                        <span className="value">Increases with score</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Fireworks:</span>
                        <span className="value">Every 500 points!</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Line Clear:</span>
                        <span className="value">100 points each</span>
                    </div>
                </div>
                
                <div className="game-area">
                    <div className="tetris-board">
                        {displayBoard.map((row, r) =>
                            row.map((cell, c) => (
                                <div key={r + '-' + c} className={`cell color-${cell}`} />
                            ))
                        )}
                    </div>
                    <div className="score">Score: {score}</div>
                    {gameOver && (
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ color: 'red', marginBottom: '10px' }}>Game Over</div>
                            <button onClick={restartGame} className="restart-button">
                                Restart Game
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {showFireworks && (
                <div className="fireworks">
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                    <div className="firework"></div>
                </div>
            )}
        </div>
    );
}

export default Tetris;
