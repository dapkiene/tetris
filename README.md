# Tetris Game

A classic Tetris game built with React.js and Node.js featuring real-time gameplay with WebSocket communication.

## Features

- Classic Tetris gameplay mechanics
- Real-time multiplayer support via WebSocket
- Modern React frontend with responsive design
- Node.js backend for game state management
- Configurable development server port

## Tech Stack

- **Frontend**: React.js, Webpack, Babel
- **Backend**: Node.js, Express, WebSocket
- **Build Tools**: Webpack Dev Server, Concurrently

## Prerequisites

- Node.js (version 14 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tetris
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Start both frontend and backend servers concurrently:

```bash
npm start
```

By default, the frontend runs on port 3000 and backend on port 4000.

### Custom Port Configuration

You can specify a custom port for the frontend using the PORT environment variable:

```bash
PORT=3002 npm start
```

### Individual Services

Start only the backend:
```bash
npm run start:backend
```

Start only the frontend:
```bash
npm run start:frontend
```

## Project Structure

```
tetris/
├── tetris-game/
│   ├── frontend/          # React frontend application
│   │   ├── src/           # Source files
│   │   ├── public/        # Static assets
│   │   └── webpack.config.js
│   └── backend/           # Node.js backend server
│       ├── index.js       # Server entry point
│       └── package.json
├── package.json           # Root package configuration
└── README.md
```

## Game Controls

- **Arrow Keys**: Move and rotate pieces
- **Space**: Hard drop
- **Enter**: Start/Pause game

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request