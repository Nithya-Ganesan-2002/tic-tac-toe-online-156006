import React from "react";
import Square from "./Square";

/**
 * PUBLIC_INTERFACE
 * Board component
 * Renders a 3x3 grid of squares.
 *
 * Props:
 * - squares: string[] length 9 with values 'X' | 'O' | null
 * - onSquareClick: (index: number) => void
 * Returns: JSX.Element
 */
export default function Board({ squares, onSquareClick }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe grid">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onSquareClick(idx)}
          position={idx}
        />
      ))}
    </div>
  );
}
