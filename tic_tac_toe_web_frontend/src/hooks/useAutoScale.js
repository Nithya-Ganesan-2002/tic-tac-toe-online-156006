import { useRef, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * useAutoScale
 * Scales a "screen" element to fit within the viewport while maintaining aspect ratio,
 * and applies padding to its wrapper to visually center it. This replicates the behavior
 * from the extracted Figma HTML/JS (assets/scripts/app.js) but in a React-friendly way.
 *
 * @param {number} baseWidth - The base design width (e.g., 1920).
 * @param {number} baseHeight - The base design height (e.g., 960).
 * @returns {{ wrapperRef: import('react').RefObject<HTMLDivElement>, screenRef: import('react').RefObject<HTMLDivElement> }}
 */
export function useAutoScale(baseWidth, baseHeight) {
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const screenEl = screenRef.current;
    const wrapperEl = wrapperRef.current;
    if (!screenEl || !wrapperEl) return;

    function rescale() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / baseWidth, vh / baseHeight);

      // Apply transform to scale the screen
      screenEl.style.transform = `scale(${scale})`;

      // Center via wrapper padding
      const left = (vw - baseWidth * scale) / 2;
      const top = (vh - baseHeight * scale) / 2;
      wrapperEl.style.paddingLeft = `${left}px`;
      wrapperEl.style.paddingTop = `${top}px`;
    }

    window.addEventListener("resize", rescale);
    rescale();

    return () => {
      window.removeEventListener("resize", rescale);
    };
  }, [baseWidth, baseHeight]);

  return { wrapperRef, screenRef };
}
