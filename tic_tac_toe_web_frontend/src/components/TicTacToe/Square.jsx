import React from "react";

/**
 * PUBLIC_INTERFACE
 * Square component
 * An interactive button for a single cell in the Tic Tac Toe grid.
 *
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - position: number (0..8), used for aria attributes
 * Returns: JSX.Element
 */
export default function Square({ value, onClick, position }) {
  const row = Math.floor(position / 3) + 1;
  const col = (position % 3) + 1;

  return (
    <button
      type="button"
      className={`square ${value ? "filled" : ""} ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
      onClick={onClick}
      role="gridcell"
      aria-label={`row ${row}, column ${col}${value ? `, ${value}` : ""}`}
    >
      {value}
    </button>
  );
}
