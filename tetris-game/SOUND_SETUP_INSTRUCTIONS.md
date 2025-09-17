# 🎵 Tetris Game with Animal Sounds - Setup Instructions

Welcome to the enhanced Tetris game featuring animal sounds for each piece type! This guide will help you set up the complete audio experience.

## 🎮 Game Features

- **Classic Tetris gameplay** with modern 3D visual effects
- **Unique animal sounds** for each of the 7 Tetris piece types
- **High score system** with nickname tracking
- **Fireworks celebration** every 500 points
- **Sound toggle** to enable/disable audio
- **Responsive design** with intuitive controls

## 🔊 Animal Sound System

Each Tetris piece plays a distinctive animal sound when placed:

| Piece | Shape | Color | Animal Sound |
|-------|-------|-------|--------------|
| **I-piece** | Straight line (4 blocks) | Cyan | 🐘 **Elephant trumpet** |
| **O-piece** | Square (2x2 blocks) | Yellow | 🦆 **Duck quack** |
| **T-piece** | T-shape | Purple | 🐱 **Cat meow** |
| **J-piece** | J-shape | Blue | 🐕 **Dog bark** |
| **L-piece** | L-shape | Orange | 🦁 **Lion roar** |
| **S-piece** | S-shape | Green | 🐦 **Bird chirp** |
| **Z-piece** | Z-shape | Red | 🐸 **Frog ribbit** |

## 📥 Download Animal Sound Files

### Quick Setup
1. Navigate to `/public/audio/` directory in your project
2. Download the animal sound files listed below
3. Ensure files are named exactly as specified

### Required Files
You need to download 7 audio files with these exact names:

1. **`elephant.mp3`** - Elephant trumpet sound
2. **`duck.mp3`** - Duck quack sound  
3. **`cat.mp3`** - Cat meow sound
4. **`dog.mp3`** - Dog bark sound
5. **`lion.mp3`** - Lion roar sound
6. **`bird.mp3`** - Bird chirp/tweet sound
7. **`frog.mp3`** - Frog ribbit sound

### Recommended Sources

#### 🆓 Free Audio Libraries
- **[Freesound.org](https://freesound.org)** (Account required)
  - High-quality sounds
  - Creative Commons licensed
  - Search terms: "elephant trumpet", "duck quack", etc.

- **[Zapsplat.com](https://zapsplat.com)** (Free account)
  - Professional sound effects
  - High-quality audio
  - Easy search and download

- **[YouTube Audio Library](https://studio.youtube.com/channel/UC.../music)**
  - Royalty-free sounds
  - No account needed
  - Direct download

#### 📋 File Specifications
- **Format**: MP3 (preferred) or WAV
- **Duration**: 0.5 - 2 seconds optimal
- **Size**: Keep under 1MB per file
- **Quality**: 44.1kHz, 16-bit minimum

### Download Commands (if you have direct URLs)
```bash
# Navigate to audio directory
cd /public/audio/

# Download files (replace URLs with actual sound file URLs)
wget -O elephant.mp3 "https://example.com/elephant-sound.mp3"
wget -O duck.mp3 "https://example.com/duck-sound.mp3"
wget -O cat.mp3 "https://example.com/cat-sound.mp3"
wget -O dog.mp3 "https://example.com/dog-sound.mp3"
wget -O lion.mp3 "https://example.com/lion-sound.mp3"
wget -O bird.mp3 "https://example.com/bird-sound.mp3"
wget -O frog.mp3 "https://example.com/frog-sound.mp3"
```

## 🎯 How to Use

### Starting the Game
1. **Start the backend server**:
   ```bash
   cd tetris-game/backend
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd tetris-game/frontend
   npm start
   ```

3. **Open the game**: Navigate to `http://localhost:3000`

### Playing with Sounds
1. **Enter your nickname** when prompted
2. **Click "Start Game"** to begin
3. **Enable sounds** using the 🔊 button in the controls panel
4. **Play Tetris** - each piece will play its animal sound when placed!

### Sound Controls
- **🔊 Sound On/Off**: Toggle button in the left control panel
- **Volume**: Currently set to 30% (moderate level)
- **Browser Audio**: Ensure your browser allows audio playback

## 🎮 Game Controls

| Key | Action |
|-----|--------|
| **←** | Move piece left |
| **→** | Move piece right |
| **↓** | Move piece down faster |
| **↑** | Rotate piece clockwise |
| **Ctrl** | Rotate piece clockwise |

## 🏆 Game Features

- **Scoring**: 100 points per line cleared
- **Speed**: Increases automatically with score
- **Fireworks**: Celebration animation every 500 points
- **High Scores**: Persistent leaderboard with your best scores
- **3D Effects**: Beautiful gradient blocks with shadows

## 🔧 Troubleshooting

### No Sound Playing
1. **Check file names**: Must match exactly (elephant.mp3, duck.mp3, etc.)
2. **Check file location**: Files must be in `/public/audio/` directory
3. **Browser console**: Check for audio loading errors (F12 → Console)
4. **Sound toggle**: Ensure sound is enabled in game controls
5. **Browser permissions**: Allow audio playback when prompted

### Audio File Issues
1. **Format**: Convert to MP3 if using other formats
2. **Size**: Large files may cause loading delays
3. **Quality**: Very low quality may not play properly

### Performance Issues
1. **File size**: Keep audio files under 1MB each
2. **Browser cache**: Clear cache if sounds don't update
3. **Multiple tabs**: Close other audio-heavy browser tabs

## 🎨 Customization

### Changing Animal Sounds
1. Replace any audio file in `/public/audio/`
2. Keep the same filename
3. Refresh the browser to load new sounds

### Adjusting Volume
Edit the volume in `/src/Tetris.js`:
```javascript
audio.volume = 0.3; // Change from 0.0 (silent) to 1.0 (full volume)
```

### Adding New Sounds
To add more sound variety, modify the `playAnimalSound` function in `/src/Tetris.js`.

## 📜 License Notes

- Ensure downloaded audio files are properly licensed for your use
- Most free sources require attribution
- Check individual file licenses before commercial use

## 🎉 Enjoy!

You now have a fully functional Tetris game with delightful animal sounds! Each piece placement becomes a mini audio adventure. Have fun playing and listening to the animal symphony of Tetris!

---

**Need help?** Check the browser console (F12) for any error messages, or refer to the troubleshooting section above.
