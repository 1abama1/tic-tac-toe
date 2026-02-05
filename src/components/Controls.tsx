import React from 'react';
import type { Difficulty } from '../utils/gameLogic';

interface ControlsProps {
    difficulty: Difficulty;
    setDifficulty: (diff: Difficulty) => void;
    onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ difficulty, setDifficulty, onReset }) => {
    return (
        <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-md">
            <div className="flex gap-2 p-1 glass-panel rounded-full relative">
                {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`
              px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${difficulty === level
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                                : 'text-gray-400 hover:text-white'}
            `}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <button
                onClick={onReset}
                className="
          px-8 py-3 rounded-xl font-bold tracking-wider text-white
          bg-white/5 hover:bg-white/10 border border-white/10
          transition-all duration-300 active:scale-95
          hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]
        "
            >
                RESTART GAME
            </button>
        </div>
    );
};

export default Controls;
