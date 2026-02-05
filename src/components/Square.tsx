import React from 'react';
import type { Player } from '../utils/gameLogic';
import '../index.css';

interface SquareProps {
    value: Player;
    onClick: () => void;
    isWinningSquare: boolean;
    disabled: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, disabled }) => {



    // Dynamic styles


    const textStyle = value === 'X' ? 'neon-text-cyan' : 'neon-text-magenta';

    return (
        <button
            className={`
        relative w-full h-full flex items-center justify-center 
        text-[10vmin] font-bold rounded-xl glass-panel
        transition-all duration-300
        ${!value && !disabled ? 'hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer' : ''}
        ${isWinningSquare ? 'border-green-400 !bg-green-500/20 shadow-[0_0_20px_rgba(0,255,157,0.4)]' : ''}
        ${disabled && !isWinningSquare ? 'cursor-default' : ''}
      `}
            onClick={onClick}
            disabled={disabled}
        >
            <span className={`${textStyle} ${value ? 'animate-pop-in' : ''}`}>
                {value}
            </span>
        </button>
    );
};

export default Square;
