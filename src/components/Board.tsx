import React from 'react';
import Square from './Square';
import type { Player } from '../utils/gameLogic';

interface BoardProps {
    squares: Player[];
    onClick: (i: number) => void;
    winningLine: number[] | null;
    isGameOver: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, isGameOver }) => {
    const renderSquare = (i: number) => {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                isWinningSquare={winningLine?.includes(i) ?? false}
                disabled={squares[i] !== null || isGameOver}
            />
        );
    };

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-3 p-4 glass-panel mt-4 w-[65vmin] h-[65vmin] max-w-[600px] max-h-[600px]">
            {squares.map((_, i) => renderSquare(i))}
        </div>
    );
};

export default Board;
