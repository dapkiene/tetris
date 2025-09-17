#!/bin/bash

# Animal Sound Downloader Script for Tetris Game
# This script will help you download free animal sounds

echo "🎵 Tetris Animal Sound Downloader"
echo "================================="
echo ""

AUDIO_DIR="/Users/ruta_dapkiene/Projects/tetris/tetris-game/frontend/public/audio"

# Check if we're in the right directory
if [ ! -d "$AUDIO_DIR" ]; then
    echo "❌ Audio directory not found: $AUDIO_DIR"
    exit 1
fi

cd "$AUDIO_DIR"
echo "📁 Working in: $AUDIO_DIR"
echo ""

# Function to download a sound file
download_sound() {
    local animal=$1
    local url=$2
    local filename="${animal}.mp3"
    
    echo "🔄 Downloading ${animal} sound..."
    
    if curl -L -o "$filename" "$url" --progress-bar; then
        echo "✅ Successfully downloaded ${animal}.mp3"
    else
        echo "❌ Failed to download ${animal} sound from $url"
        echo "🔍 Please manually download from:"
        echo "   - https://freesound.org/ (search '${animal}')"
        echo "   - https://pixabay.com/sound-effects/ (search '${animal}')"
        echo "   Save as: ${filename}"
    fi
    echo ""
}

# Try downloading from various free sources
echo "🎯 Downloading animal sounds..."
echo ""

# Note: These URLs are placeholders - you'll need real download URLs
# The actual download will likely require manual steps from freesound.org or pixabay.com

echo "📝 Manual Download Instructions:"
echo ""
echo "Since most free sound libraries require browsing and manual download,"
echo "please visit these sites and download the following files:"
echo ""

echo "1. 🐘 ELEPHANT TRUMPET (elephant.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'elephant trumpet'"
echo "   - Download a short (1-2 second) elephant trumpet sound"
echo "   - Save as: elephant.mp3"
echo ""

echo "2. 🦆 DUCK QUACK (duck.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'duck quack'"
echo "   - Download a short duck quack sound"
echo "   - Save as: duck.mp3"
echo ""

echo "3. 🐱 CAT MEOW (cat.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'cat meow'"
echo "   - Download a short cat meow sound"
echo "   - Save as: cat.mp3"
echo ""

echo "4. 🐕 DOG BARK (dog.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'dog bark'"
echo "   - Download a short dog bark sound"
echo "   - Save as: dog.mp3"
echo ""

echo "5. 🦁 LION ROAR (lion.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'lion roar'"
echo "   - Download a short lion roar sound"
echo "   - Save as: lion.mp3"
echo ""

echo "6. 🐦 BIRD CHIRP (bird.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'bird chirp'"
echo "   - Download a short bird chirp sound"
echo "   - Save as: bird.mp3"
echo ""

echo "7. 🐸 FROG RIBBIT (frog.mp3)"
echo "   - Visit: https://freesound.org/"
echo "   - Search: 'frog ribbit'"
echo "   - Download a short frog ribbit sound"
echo "   - Save as: frog.mp3"
echo ""

echo "💡 Tips:"
echo "   - Files should be MP3 format"
echo "   - Keep files under 1MB each"
echo "   - Duration: 0.5-2 seconds optimal"
echo "   - Choose clear, recognizable animal sounds"
echo ""

echo "🔗 Alternative Sources:"
echo "   - Pixabay: https://pixabay.com/sound-effects/"
echo "   - Zapsplat: https://zapsplat.com/ (free account required)"
echo "   - YouTube Audio Library (convert to MP3)"
echo ""

echo "✅ Once downloaded, place all 7 files in:"
echo "   $AUDIO_DIR"
echo ""
echo "🎮 Then refresh your Tetris game to hear the new sounds!"
