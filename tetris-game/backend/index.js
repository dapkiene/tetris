const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let highScores = [];

app.get('/api/highscores', (req, res) => {
    res.json(highScores);
});

app.post('/api/highscores', (req, res) => {
    const { name, score } = req.body;
    if (typeof name === 'string' && typeof score === 'number') {
        highScores.push({ name, score });
        highScores = highScores.sort((a, b) => b.score - a.score).slice(0, 10);
        res.status(201).json({ success: true });
    } else {
        res.status(400).json({ success: false, message: 'Invalid data' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
