"use client";

import { useMemo } from "react";
import styles from "./rainingDotsBackground.module.css";

const COLS = 16;
const ROWS = 7;
const DOT_SIZE = 4;
const OPACITY = 0.38;
const DURATION = 9;

function createDots() {
  const dots = [];
  let id = 0;

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      dots.push({
        id: id++,
        left: ((col + 0.5) / COLS) * 100,
        delay: -((row * DURATION) / ROWS + (col * DURATION) / (COLS * 1.5)),
      });
    }
  }

  return dots;
}

export default function RainingDotsBackground() {
  const dots = useMemo(() => createDots(), []);

  return (
    <div className={styles.canvas} aria-hidden="true">
      {dots.map((dot) => (
        <span
          key={dot.id}
          className={styles.dot}
          style={{
            left: `${dot.left}%`,
            width: `${DOT_SIZE}px`,
            height: `${DOT_SIZE}px`,
            opacity: OPACITY,
            animationDuration: `${DURATION}s`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
