 /**
  * PUBLIC_INTERFACE
  * getBestMove
  * Returns the best move index for the AI player using a minimax algorithm with depth scoring.
  *
  * @param {Array<('X'|'O'|null)>} squares - Current board state
  * @param {'X'|'O'} aiPlayer - The AI player symbol, typically 'O'
  * @param {'X'|'O'} humanPlayer - The human player symbol, typically 'X'
  * @returns {number|null} The index (0..8) for the best move, or null if no moves available
  */
export function getBestMove(squares, aiPlayer = "O", humanPlayer = "X") {
  if (calculateWinner(squares) || squares.every(Boolean)) {
    return null;
  }

  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < 9; i += 1) {
    if (!squares[i]) {
      squares[i] = aiPlayer;
      const score = minimax(squares, 0, false, aiPlayer, humanPlayer);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function minimax(board, depth, isMaximizing, ai, human) {
  const winner = calculateWinner(board);
  if (winner === ai) return 10 - depth;
  if (winner === human) return depth - 10;
  if (board.every(Boolean)) return 0; // tie

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i += 1) {
      if (!board[i]) {
        board[i] = ai;
        best = Math.max(best, minimax(board, depth + 1, false, ai, human));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i += 1) {
      if (!board[i]) {
        board[i] = human;
        best = Math.min(best, minimax(board, depth + 1, true, ai, human));
        board[i] = null;
      }
    }
    return best;
  }
}

function calculateWinner(sq) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diags
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return sq[a];
    }
  }
  return null;
}
