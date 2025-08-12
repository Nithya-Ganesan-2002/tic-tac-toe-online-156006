import React, { useEffect, useMemo, useState } from "react";
import Board from "./Board";
import { getBestMove } from "../../game/ai";

/**
 * PUBLIC_INTERFACE
 * TicTacToe component
 * A fully functional Tic Tac Toe game with:
 * - Mode selection: Player vs Player (PvP) or Player vs AI (PvAI)
 * - Interactive 3x3 board
 * - Move history with time-travel
 * - Scoreboard with wins and draws
 * - Responsive layout and modern, minimalistic design
 *
 * Props: none
 * Returns: JSX.Element
 */
export default function TicTacToe() {
  // Game mode: 'pvp' or 'ai'
  const [mode, setMode] = useState("ai");
  // History of moves: array of { squares: string[]; lastMoveIndex: number | null }
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastMoveIndex: null }]);
  // Current step index into history
  const [step, setStep] = useState(0);
  // Score tracking across games
  const [scores, setScores] = useState({ X: 0, O: 0, Ties: 0 });
  // X starts by default
  const xStarts = true;

  const current = history[step];
  const squares = current.squares;
  const xIsNext = useMemo(() => {
    // Next player determined by parity of step
    return step % 2 === 0 ? xStarts : !xStarts;
  }, [step, xStarts]);

  const winner = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = squares.every((v) => v !== null);
  const isDraw = !winner && isBoardFull;
  const gameOver = Boolean(winner) || isDraw;

  const currentPlayer = xIsNext ? "X" : "O";
  const humanPlayer = "X"; // In AI mode, Human is X, AI is O

  // Trigger AI move automatically in AI mode when it's AI's turn and game not over
  useEffect(() => {
    if (mode === "ai" && !gameOver && currentPlayer !== humanPlayer) {
      const id = setTimeout(() => {
        const aiIndex = getBestMove(squares, "O", "X");
        if (aiIndex !== null && aiIndex !== undefined) {
          playMove(aiIndex);
        }
      }, 250); // small delay for UX
      return () => clearTimeout(id);
    }
  }, [mode, squares, currentPlayer, humanPlayer, gameOver]);

  // Handle a square click
  const handleSquareClick = (index) => {
    if (gameOver) return;
    // In AI mode, ignore clicks when it's AI turn
    if (mode === "ai" && currentPlayer !== humanPlayer) return;
    if (squares[index]) return;

    playMove(index);
  };

  // Apply a move at index based on current player
  function playMove(index) {
    const nextSquares = squares.slice();
    nextSquares[index] = currentPlayer;

    // Discard any "future" history after step (time travel)
    const newHistory = history.slice(0, step + 1).concat([{ squares: nextSquares, lastMoveIndex: index }]);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  }

  // Start a brand-new game (reset board and history, keep scores)
  // PUBLIC_INTERFACE
  const startNewGame = () => {
    setHistory([{ squares: Array(9).fill(null), lastMoveIndex: null }]);
    setStep(0);
  };

  // PUBLIC_INTERFACE
  const resetScores = () => {
    setScores({ X: 0, O: 0, Ties: 0 });
    startNewGame();
  };

  // Update scores when a game ends (only once, when the game reaches an end state)
  useEffect(() => {
    if (gameOver) {
      // Determine if this end state was just reached (avoid recount when time traveling)
      const hasAnyMark = squares.some(Boolean);
      if (!hasAnyMark) return;
      // Check if this is the final history step and just ended
      // We track using a weak "lock" via a property on the last history entry.
      const last = history[history.length - 1];
      if (last && !last.__counted) {
        // Mark counted
        last.__counted = true;
        // Update scores
        setScores((prev) => {
          if (winner === "X") return { ...prev, X: prev.X + 1 };
          if (winner === "O") return { ...prev, O: prev.O + 1 };
          return { ...prev, Ties: prev.Ties + 1 };
        });
      }
    }
  }, [gameOver, squares, winner, history]);

  // Time travel to a particular step in history
  // PUBLIC_INTERFACE
  const jumpTo = (moveIndex) => {
    setStep(moveIndex);
  };

  // Change mode and reset the ongoing game (scores persist)
  // PUBLIC_INTERFACE
  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);
    startNewGame();
  };

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "Draw";
    return `Turn: ${currentPlayer}`;
  }, [winner, isDraw, currentPlayer]);

  return (
    <div className="ttt-container" role="application" aria-label="Tic Tac Toe game">
      <div className="ttt-controls">
        <div className="ttt-title">Tic Tac Toe</div>

        <div className="ttt-mode">
          <label className="mode-label">Mode:</label>
          <div className="mode-options" role="radiogroup" aria-label="Game mode">
            <label className="mode-option">
              <input
                type="radio"
                name="mode"
                value="pvp"
                checked={mode === "pvp"}
                onChange={handleModeChange}
              />
              Player vs Player
            </label>
            <label className="mode-option">
              <input
                type="radio"
                name="mode"
                value="ai"
                checked={mode === "ai"}
                onChange={handleModeChange}
              />
              Player vs AI
            </label>
          </div>
        </div>

        <div className={`ttt-status ${winner ? "win" : isDraw ? "draw" : ""}`} aria-live="polite">
          {statusText}
        </div>
      </div>

      <div className="ttt-board-wrapper">
        <Board squares={squares} onSquareClick={handleSquareClick} />
      </div>

      <div className="ttt-actions">
        <button className="btn primary" onClick={startNewGame} aria-label="Start a new game">
          New Game
        </button>
        <button className="btn accent" onClick={resetScores} aria-label="Reset scores">
          Reset Scores
        </button>
      </div>

      <div className="ttt-bottom">
        <div className="ttt-score" aria-label="Scoreboard">
          <div className="score-item">
            <span className="score-label">X</span>
            <span className="score-value">{scores.X}</span>
          </div>
          <div className="score-item">
            <span className="score-label">O</span>
            <span className="score-value">{scores.O}</span>
          </div>
          <div className="score-item">
            <span className="score-label">Ties</span>
            <span className="score-value">{scores.Ties}</span>
          </div>
        </div>

        <div className="ttt-history" aria-label="Move history">
          <div className="history-title">History</div>
          <ol className="history-list">
            {history.map((stepState, move) => {
              const desc =
                move === 0
                  ? "Go to start"
                  : `Move #${move} (${formatMove(stepState.lastMoveIndex)})`;
              return (
                <li key={move}>
                  <button
                    className={`link ${move === step ? "active" : ""}`}
                    onClick={() => jumpTo(move)}
                    aria-current={move === step ? "step" : undefined}
                    aria-label={desc}
                  >
                    {desc}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Keep the Learn React link for CI test stability */}
      <div className="ttt-footer">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

/** Calculate winner from a board state. Returns 'X' | 'O' | null. */
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

function formatMove(index) {
  if (index === null || index === undefined) return "-";
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return `r${row}c${col}`;
}
