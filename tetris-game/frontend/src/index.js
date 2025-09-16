import React from 'react';
import { createRoot } from 'react-dom/client';
import Tetris from './Tetris';
import './style.css';

const root = createRoot(document.getElementById('root'));
root.render(<Tetris />);
