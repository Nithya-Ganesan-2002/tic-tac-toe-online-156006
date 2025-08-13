import React from "react";
import { useAutoScale } from "../../hooks/useAutoScale";
import "../../design/common.css";
import "../../design/board.css";

/**
 * PUBLIC_INTERFACE
 * BoardScreen
 * A React component rendering the "Board" screen extracted from Figma.
 * - Uses design system tokens via CSS variables
 * - Follows exact positions, sizes, and typography
 * - Auto-scales to fit viewport while preserving aspect ratio (2856 x 1726)
 *
 * Usage:
 *  <BoardScreen />
 */
export default function BoardScreen() {
  const { wrapperRef, screenRef } = useAutoScale(2856, 1726);

  return (
    <div className="screen-wrapper" ref={wrapperRef}>
      <div
        ref={screenRef}
        className="screen board"
        data-screen-name="Board"
        role="img"
        aria-label="Tic Tac Toe board layout"
      >
        {/* Main panel (Frame: tic-tac-to) */}
        <div className="tic-tac-to" aria-hidden="false">
          {/* Scoreboard (Frame: container) */}
          <div className="scoreboard" role="group" aria-label="Scores container">
            {/* PLAYER X card */}
            <div className="score-card score-x" aria-label="Player X score card">
              <div className="score-title typo-11">PLAYER X</div>
              <div className="score-box">
                <div className="score-value typo-12">0</div>
              </div>
            </div>

            {/* DRAW card */}
            <div className="score-card score-draw" aria-label="Draw score card">
              <div className="score-title typo-11">DRAW</div>
              <div className="score-box">
                <div className="score-value typo-12">0</div>
              </div>
            </div>

            {/* PLAYER O card */}
            <div className="score-card score-o" aria-label="Player O score card">
              <div className="score-title typo-11">PLAYER O</div>
              <div className="score-box">
                <div className="score-value typo-12">0</div>
              </div>
            </div>
          </div>

          {/* Grid container */}
          <div className="grid-container" role="grid" aria-label="3x3 grid">
            {/* Row 1 */}
            <div className="cell g11" role="gridcell" aria-label="r1c1">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-10"> </div>
            </div>
            <div className="cell g12" role="gridcell" aria-label="r1c2">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
            <div className="cell g13" role="gridcell" aria-label="r1c3">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>

            {/* Row 2 */}
            <div className="cell g21" role="gridcell" aria-label="r2c1">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
            <div className="cell g22" role="gridcell" aria-label="r2c2">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
            <div className="cell g23" role="gridcell" aria-label="r2c3">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>

            {/* Row 3 */}
            <div className="cell g31" role="gridcell" aria-label="r3c1">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
            <div className="cell g32" role="gridcell" aria-label="r3c2">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
            <div className="cell g33" role="gridcell" aria-label="r3c3">
              <div className="hover" aria-hidden="true"></div>
              <div className="symbol typo-9"> </div>
            </div>
          </div>
        </div>

        {/* Badge "Made with Figma" (Frame 1) */}
        <div className="badge-other" aria-hidden="false">
          <div className="label typo-13">Made with Figma</div>
        </div>

        {/* Title text */}
        <div className="hero-title typo-14">
          {"tic.\ntac.toe."}
        </div>
      </div>
    </div>
  );
}
