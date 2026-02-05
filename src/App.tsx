import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Modal from './components/Modal';
import {
  calculateWinner,
  isBoardFull,
  getBestMove
} from './utils/gameLogic';
import type {
  Player,
  ValidPlayer,
  Difficulty
} from './utils/gameLogic';

function App() {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  // isXNext tracks whose turn it is in the current game.
  // X ALWAYS goes first in Tic Tac Toe rules.
  const [isXNext, setIsXNext] = useState(true);

  // humanPlayer tracks which symbol the user is controlling.
  // We toggle this after each game to swap sides.
  const [humanPlayer, setHumanPlayer] = useState<ValidPlayer>('X');

  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [winnerInfo, setWinnerInfo] = useState<{ winner: ValidPlayer, line: number[] } | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  // Reset game state
  // If swapSides is true, the human switches from X to O or vice versa
  const resetGame = useCallback((swapSides = false) => {
    setSquares(Array(9).fill(null));
    setIsXNext(true); // X always goes first
    setWinnerInfo(null);
    setIsDraw(false);

    if (swapSides) {
      setHumanPlayer(prev => prev === 'X' ? 'O' : 'X');
    }
  }, []);

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    // Don't swap sides on difficulty change, just reset
    resetGame(false);
  };

  // AI Turn
  useEffect(() => {
    const currentPlayer = isXNext ? 'X' : 'O';

    // If it's NOT the human's turn, it's the AI's turn
    if (currentPlayer !== humanPlayer && !winnerInfo && !isDraw) {
      // Small delay for realism
      const timer = setTimeout(() => {
        // AI calculates best move based on who is playing (currentPlayer)
        // If AI is 'O', it maximizes for 'O'. If 'X', maximizes for 'X'.
        const moveIndex = getBestMove(squares, difficulty, currentPlayer);
        if (moveIndex !== -1) {
          handleMove(moveIndex, currentPlayer);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winnerInfo, isDraw, squares, difficulty, humanPlayer]);

  const handleMove = (i: number, playerOverride?: Player) => {
    if (squares[i] || winnerInfo || isDraw) return;

    const nextSquares = squares.slice();
    const currentPlayer = playerOverride || (isXNext ? 'X' : 'O');
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);

    const result = calculateWinner(nextSquares);
    if (result) {
      setWinnerInfo(result);
    } else if (isBoardFull(nextSquares)) {
      setIsDraw(true);
    } else {
      setIsXNext(!isXNext);
    }
  };

  // Human click handler
  const onSquareClick = (i: number) => {
    const currentPlayer = isXNext ? 'X' : 'O';
    // Only allow move if it's user's turn
    if (currentPlayer === humanPlayer) {
      handleMove(i);
    }
  };

  const handleModalClose = () => {
    // Swap sides after each completed game
    resetGame(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#050505] overflow-hidden relative p-4">
      <div className="mb-4 sm:mb-8 text-center animate-in slide-in-from-top-10 duration-700 z-10 w-full">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-2 drop-shadow-2xl">
          <span className="neon-text-cyan mr-2">TIC</span>
          <span className="text-white">TAC</span>
          <span className="neon-text-magenta ml-2">TOE</span>
        </h1>
        <div className="mt-4 text-xs font-mono text-gray-500 animate-pulse">
          YOU ARE PLAYING AS <span className={`font-bold ${humanPlayer === 'X' ? 'neon-text-cyan' : 'neon-text-magenta'}`}>{humanPlayer}</span>
        </div>
      </div>

      <div className="z-10 w-full flex flex-col items-center flex-grow justify-center">
        <Board
          squares={squares}
          onClick={onSquareClick}
          winningLine={winnerInfo?.line || null}
          isGameOver={!!winnerInfo || isDraw}
        />

        <Controls
          difficulty={difficulty}
          setDifficulty={handleDifficultyChange}
          onReset={() => resetGame(false)} // Manual reset buttons don't force a swap, optional choice
        />
      </div>

      <Modal
        winner={winnerInfo ? winnerInfo.winner : isDraw ? 'DRAW' : null}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
