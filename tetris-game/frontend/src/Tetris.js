import React, { useState, useEffect, useCallback } from 'react';

// New audio system using downloadable sound files
let soundEnabled = true; // Global sound toggle

const playAnimalSound = (animalType) => {
    if (!soundEnabled) return;

    const soundMap = {
        1: '/audio/elephant.mp3',  // I-piece: Elephant trumpet
        2: '/audio/duck.mp3',      // O-piece: Duck quack
        3: '/audio/cat.mp3',       // T-piece: Cat meow
        4: '/audio/dog.mp3',       // J-piece: Dog bark
        5: '/audio/lion.mp3',      // L-piece: Lion roar
        6: '/audio/bird.mp3',      // S-piece: Bird chirp
        7: '/audio/frog.mp3'       // Z-piece: Frog ribbit
    };

    const audioFile = soundMap[animalType];
    if (audioFile) {
        const audio = new Audio(audioFile);
        audio.volume = 0.3; // Set moderate volume
        audio.play().catch(error => {
            console.log('Audio file not found or failed to play:', audioFile);
            console.log('Please download animal sound files as described in /public/audio/README.md');
        });
    }
};

const toggleSound = () => {
    soundEnabled = !soundEnabled;
    return soundEnabled;
};

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
    const [gameStarted, setGameStarted] = useState(false);
    const [nickname, setNickname] = useState('');
    const [showNicknameInput, setShowNicknameInput] = useState(false);
    const [highScores, setHighScores] = useState([]);
    const [userBestScore, setUserBestScore] = useState(0);
    const [soundOn, setSoundOn] = useState(true);

    const handleSoundToggle = () => {
        const newSoundState = toggleSound();
        setSoundOn(newSoundState);
    };

    const getFallSpeed = useCallback(() => {
        return Math.max(100, 500 - Math.floor(score / 100) * 50);
    }, [score]);

    const fetchHighScores = useCallback(async () => {
        try {
            const response = await fetch('/api/highscores');
            const scores = await response.json();
            setHighScores(scores);

            // Find user's best score
            const userScores = scores.filter(s => s.name === nickname);
            const bestScore = userScores.length > 0 ? Math.max(...userScores.map(s => s.score)) : 0;
            setUserBestScore(bestScore);
        } catch (error) {
            console.error('Failed to fetch high scores:', error);
        }
    }, [nickname]);

    const saveScore = useCallback(async () => {
        if (!nickname || score === 0) return;

        try {
            await fetch('/api/highscores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nickname, score }),
            });
            fetchHighScores();
        } catch (error) {
            console.error('Failed to save score:', error);
        }
    }, [nickname, score, fetchHighScores]);

    const startGame = () => {
        if (!nickname.trim()) {
            setShowNicknameInput(true);
            return;
        }
        setGameStarted(true);
        setGameOver(false);
        setBoard(createBoard());
        setCurrentPiece(getRandomShape());
        setPos({ row: 0, col: 3 });
        setScore(0);
        setShowFireworks(false);
        setLastFireworkScore(0);
        fetchHighScores();
    };

    const restartGame = () => {
        setGameStarted(false);
        setGameOver(false);
        setBoard(createBoard());
        setCurrentPiece(getRandomShape());
        setPos({ row: 0, col: 3 });
        setScore(0);
        setShowFireworks(false);
        setLastFireworkScore(0);
    };

    const handleNicknameSubmit = () => {
        if (nickname.trim()) {
            setShowNicknameInput(false);
            startGame();
        }
    };

    // Load high scores when component mounts
    useEffect(() => {
        const loadInitialScores = async () => {
            try {
                const response = await fetch('/api/highscores');
                const scores = await response.json();
                setHighScores(scores);
            } catch (error) {
                console.error('Failed to fetch initial high scores:', error);
            }
        };
        loadInitialScores();
    }, []);

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
        if (!gameStarted) return;

        const interval = setInterval(() => {
            const nextPos = { row: pos.row + 1, col: pos.col };
            if (isValid(board, currentPiece, nextPos)) {
                setPos(nextPos);
            } else {
                // Play animal sound when block hits the floor
                playAnimalSound(currentPiece.color);

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
                    saveScore();
                } else {
                    setCurrentPiece(newPiece);
                    setPos(newPos);
                }
            }
        }, getFallSpeed());
        return () => clearInterval(interval);
    }, [board, currentPiece, pos, isValid, mergeShape, gameOver, score, lastFireworkScore, getFallSpeed, gameStarted, saveScore]); useEffect(() => {
        const handleKey = (e) => {
            if (gameOver || !gameStarted) return;
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
    }, [pos, currentPiece, board, isValid, rotate, gameOver, gameStarted]);

    const displayBoard = mergeShape(board, currentPiece, pos);

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <h1>Tetris Game</h1>

            {/* Nickname Input Modal */}
            {showNicknameInput && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Enter Your Nickname</h3>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleNicknameSubmit()}
                            placeholder="Your nickname..."
                            maxLength="20"
                            className="nickname-input"
                        />
                        <button onClick={handleNicknameSubmit} className="modal-button">
                            Start Game
                        </button>
                    </div>
                </div>
            )}

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

                    <h3>🔊 Sound</h3>
                    <div className="control-item">
                        <button onClick={handleSoundToggle} className="sound-toggle">
                            {soundOn ? '🔊 Sound On' : '🔇 Sound Off'}
                        </button>
                        <span className="action">Toggle animal sounds</span>
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
                    <div className="info-item">
                        <span className="label">Animal Sounds:</span>
                        <span className="value">Each piece has its own sound!</span>
                    </div>
                    <div className="info-item">
                        <span className="label">Sound Setup:</span>
                        <span className="value">Download sounds from /public/audio/</span>
                    </div>
                </div>

                <div className="game-area">
                    {!gameStarted ? (
                        <div className="start-screen">
                            <div className="welcome-message">
                                <h2>Welcome to Tetris!</h2>
                                {nickname && <p>Hello, <strong>{nickname}</strong>!</p>}
                                {userBestScore > 0 && <p>Your best score: <strong>{userBestScore}</strong></p>}
                            </div>
                            <button onClick={startGame} className="start-button">
                                {nickname ? 'Start Game' : 'Enter Nickname & Start'}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="game-header">
                                <div className="player-info">
                                    Player: <strong>{nickname}</strong>
                                    {userBestScore > 0 && <span className="best-score"> | Best: {userBestScore}</span>}
                                </div>
                            </div>
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
                                    <div className="game-over-buttons">
                                        <button onClick={startGame} className="restart-button">
                                            Play Again
                                        </button>
                                        <button onClick={restartGame} className="menu-button">
                                            Main Menu
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="scores-panel">
                    <h3>🏆 High Scores</h3>
                    <div className="scores-list">
                        {highScores.length > 0 ? (
                            highScores.map((score, index) => (
                                <div key={index} className={`score-item ${score.name === nickname ? 'current-user' : ''}`}>
                                    <span className="rank">#{index + 1}</span>
                                    <span className="name">{score.name}</span>
                                    <span className="points">{score.score}</span>
                                </div>
                            ))
                        ) : (
                            <div className="no-scores">No scores yet!</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Fireworks positioned around the game area */}
            {showFireworks && (
                <div className="fireworks-container">
                    <div className="firework firework-left-1"></div>
                    <div className="firework firework-left-2"></div>
                    <div className="firework firework-left-3"></div>
                    <div className="firework firework-right-1"></div>
                    <div className="firework firework-right-2"></div>
                    <div className="firework firework-right-3"></div>
                    <div className="firework firework-top-1"></div>
                    <div className="firework firework-top-2"></div>
                    <div className="firework firework-top-3"></div>
                    <div className="firework firework-bottom-1"></div>
                    <div className="firework firework-bottom-2"></div>
                    <div className="firework firework-bottom-3"></div>
                </div>
            )}
        </div>
    );
}

export default Tetris;
