import React from "react";
import { useAutoScale } from "../../hooks/useAutoScale";
import "../../design/common.css";
import "../../design/plugin-file-cover-1.css";

/**
 * PUBLIC_INTERFACE
 * PluginFileCover1
 * A React component rendering the "Plugin / file cover - 1" screen extracted from Figma.
 * It applies the original design tokens, screen styles, and an auto-scale behavior
 * to keep the screen centered and responsive to viewport changes.
 *
 * Usage:
 *  <PluginFileCover1 />
 */
export default function PluginFileCover1() {
  const { wrapperRef, screenRef } = useAutoScale(1920, 960);

  return (
    <div className="screen-wrapper" ref={wrapperRef}>
      <div
        ref={screenRef}
        className="screen plugin-file-cover-1"
        data-screen-name="Plugin / file cover - 1"
        role="img"
        aria-label="Tic Tac Toe cover layout"
      >
        {/* image 1 */}
        <img
          className="image-1"
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2e9d11a6-fd58-4555-b8d0-27d7c32792e7"
          alt="Decorative"
        />

        {/* tic. tac.toe. */}
        <div className="title typo-15">
          {"tic.\ntac.toe."}
        </div>

        {/* Frame 1 */}
        <div className="badge" aria-hidden="false">
          <div className="label typo-13">Made with Figma</div>
        </div>
      </div>
    </div>
  );
}
