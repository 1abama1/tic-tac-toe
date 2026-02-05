import React from 'react';
import type { ValidPlayer } from '../utils/gameLogic';

interface ModalProps {
    winner: ValidPlayer | 'DRAW' | null;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ winner, onClose }) => {
    if (!winner) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="glass-panel p-8 rounded-2xl flex flex-col items-center gap-6 max-w-sm w-full transform scale-100 animate-in zoom-in-95 duration-200">
                <h2 className="text-3xl font-bold text-center">
                    {winner === 'DRAW' ? (
                        <span className="text-gray-300">It's a Draw!</span>
                    ) : (
                        <>
                            <span className={winner === 'X' ? 'neon-text-cyan' : 'neon-text-magenta'}>
                                {winner}
                            </span>
                            <span className="text-white ml-3">Wins!</span>
                        </>
                    )}
                </h2>

                <button
                    onClick={onClose}
                    className="
            w-full py-3 rounded-xl font-bold text-black
            bg-gradient-to-r from-cyan-400 to-blue-500
            hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]
            transition-all duration-300 transform hover:-translate-y-1
          "
                >
                    PLAY AGAIN
                </button>
            </div>
        </div>
    );
};

export default Modal;
