export type Player = 'X' | 'O' | null;
export type ValidPlayer = 'X' | 'O';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares: Player[]): { winner: ValidPlayer, line: number[] } | null {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as ValidPlayer, line: WINNING_COMBINATIONS[i] };
    }
  }
  return null;
}

export function isBoardFull(squares: Player[]): boolean {
  return squares.every((square) => square !== null);
}

// Generalized Minimax: Maximizes for 'aiPlayer', minimizes for opponent
function minimax(board: Player[], depth: number, isMaximizing: boolean, aiPlayer: ValidPlayer): number {
  const result = calculateWinner(board);
  const opponent = aiPlayer === 'X' ? 'O' : 'X';

  if (result?.winner === aiPlayer) return 10 - depth;
  if (result?.winner === opponent) return depth - 10;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = opponent;
        const score = minimax(board, depth + 1, true, aiPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function getBestMove(squares: Player[], difficulty: Difficulty, aiPlayer: ValidPlayer = 'O'): number {
  const availableMoves = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null) as number[];

  if (availableMoves.length === 0) return -1;

  const opponent = aiPlayer === 'X' ? 'O' : 'X';

  // Medium: Win if possible, block if necessary, else random
  if (difficulty === 'MEDIUM') {
    // Try to win
    for (let move of availableMoves) {
      const copy = [...squares];
      copy[move] = aiPlayer;
      if (calculateWinner(copy)?.winner === aiPlayer) return move;
    }
    // Block opponent
    for (let move of availableMoves) {
      const copy = [...squares];
      copy[move] = opponent;
      if (calculateWinner(copy)?.winner === opponent) return move;
    }
    // Else random
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // Hard: Minimax
  if (difficulty === 'HARD') {
    // First move optimization (center or corner)
    if (availableMoves.length === 9) return 4; // Center
    if (availableMoves.length === 8 && squares[4] === null) return 4; // Take center if empty

    let bestScore = -Infinity;
    let move = availableMoves[0];

    for (let i = 0; i < availableMoves.length; i++) {
      const idx = availableMoves[i];
      squares[idx] = aiPlayer;
      const score = minimax(squares, 0, false, aiPlayer);
      squares[idx] = null;
      if (score > bestScore) {
        bestScore = score;
        move = idx;
      }
    }
    return move;
  }

  // Easy: Random
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}
