import type { Player } from "@/types/game";

export const PLAYERS = {
  AI: "O" as Player,
  EMPTY: "" as Player,
  HUMAN: "X" as Player,
};

export const WINNING_LINES: number[][] = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal (top-left to bottom-right)
  [2, 4, 6], // Diagonal (top-right to bottom-left)
];

export const AI_MOVE_DELAY = 250; // In milliseconds
