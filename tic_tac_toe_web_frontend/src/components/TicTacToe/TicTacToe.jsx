import React, { useEffect, useMemo, useState } from "react";
import "./TicTacToe.css";

/**
 * PUBLIC_INTERFACE
 * TicTacToe
 * A simple, self-contained Tic Tac Toe game component with:
 * - Player vs Player and Player vs AI modes
 * - Win/draw detection
 * - Move history list
 * - Score tracking and reset
 *
 * Props: none
 * Returns: JSX.Element - interactive game UI
 */
export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("ai"); // "pvp" | "ai"
  const [history, setHistory] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every((s) => s), [squares]);

  // Update scores once when the game finishes
  useEffect(() => {
    if (!winner && !isBoardFull) return;
    if (winner === "X" || winner === "O") {
      setScores((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    } else if (!winner && isBoardFull) {
      setScores((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  }, [winner, isBoardFull]);

  // Trigger AI move if mode is 'ai', it's O's turn, and the game isn't finished.
  useEffect(() => {
    if (mode !== "ai") return;
    if (winner) return;
    if (xIsNext) return; // Player (X) just moved; wait for AI (O)

    const timer = setTimeout(() => {
      const move = findBestMove(squares, "O");
      if (move != null) handleMove(move);
    }, 300); // small delay for UX feel

    return () => clearTimeout(timer);
  }, [mode, xIsNext, winner, squares]);

  function handleMove(i) {
    if (winner || squares[i]) return;
    const nextSquares = squares.slice();
    const player = xIsNext ? "X" : "O";
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setHistory((h) => [{ player, index: i, board: nextSquares }, ...h]);
  }

  function handleSquareClick(i) {
    if (mode === "ai" && !xIsNext) return; // prevent clicking during AI turn
    handleMove(i);
  }

  // PUBLIC_INTERFACE
  /** Reset the current board but keep scores/history. */
  function resetBoard() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHistory([]);
  }

  // PUBLIC_INTERFACE
  /** Reset both board and scores. */
  function resetAll() {
    resetBoard();
    setScores({ X: 0, O: 0, Draws: 0 });
  }

  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull
    ? "Draw!"
    : `Next player: ${xIsNext ? "X" : "O"}${
        mode === "ai" ? xIsNext ? " (You)" : " (AI)" : ""
      }`;

  return (
    <div className="ttt-container" role="region" aria-label="Tic Tac Toe game">
      <div className="ttt-controls">
        <div className="ttt-row">
          <div className="ttt-group">
            <label htmlFor="mode" className="ttt-label">Mode</label>
            <select
              id="mode"
              className="ttt-select"
              value={mode}
              onChange={(e) => {
                setMode(e.target.value);
                resetBoard();
              }}
              aria-label="Select game mode"
            >
              <option value="pvp">Player vs Player</option>
              <option value="ai">Player vs AI</option>
            </select>
          </div>
          <div className="ttt-group">
            <span className="ttt-label">Scores</span>
            <div className="ttt-scores">
              <span>X: {scores.X}</span>
              <span>O: {scores.O}</span>
              <span>Draws: {scores.Draws}</span>
            </div>
          </div>
        </div>
        <div className="ttt-row">
          <div className="ttt-status" aria-live="polite">{status}</div>
          <div className="ttt-actions">
            <button className="ttt-btn" onClick={resetBoard} type="button">New Round</button>
            <button className="ttt-btn ttt-btn-secondary" onClick={resetAll} type="button">Reset Scores</button>
          </div>
        </div>
      </div>

      <div className="ttt-board" role="grid" aria-label="3 by 3 Tic Tac Toe board">
        {squares.map((val, i) => (
          <button
            key={i}
            className={`ttt-square ${val ? "filled" : ""}`}
            onClick={() => handleSquareClick(i)}
            role="gridcell"
            aria-label={`Cell ${i + 1}, ${val ? val : "empty"}`}
          >
            {val}
          </button>
        ))}
      </div>

      <div className="ttt-history" aria-label="Move history">
        <div className="ttt-history-title">History</div>
        <ol className="ttt-history-list">
          {history.length === 0 && <li className="ttt-history-empty">No moves yet</li>}
          {history.map((h, idx) => (
            <li key={idx}>
              <span>#{history.length - idx} - {h.player} to {formatCell(h.index)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* Helpers */

function formatCell(index) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return `r${row}c${col}`;
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diagonals
  ];
  for (const [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
  }
  return null;
}

function findBestMove(sq, aiPlayer) {
  const human = aiPlayer === "X" ? "O" : "X";
  let bestScore = -Infinity;
  let move = null;
  for (let i = 0; i < 9; i++) {
    if (!sq[i]) {
      const next = sq.slice();
      next[i] = aiPlayer;
      const score = minimax(next, false, aiPlayer, human, 0);
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(sq, isMaximizing, aiPlayer, human, depth) {
  const winner = calculateWinner(sq);
  const full = sq.every(Boolean);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === human) return depth - 10;
  if (!winner && full) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!sq[i]) {
        const next = sq.slice();
        next[i] = aiPlayer;
        best = Math.max(best, minimax(next, false, aiPlayer, human, depth + 1));
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!sq[i]) {
        const next = sq.slice();
        next[i] = human;
        best = Math.min(best, minimax(next, true, aiPlayer, human, depth + 1));
      }
    }
    return best;
  }
}
