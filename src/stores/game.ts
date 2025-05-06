import type { GameBoard, Score } from "@/types/game";

import { defineStore } from "pinia";

type GameStoreState = {
  board: GameBoard;
  scores: Score;
};

export const useGameStore = defineStore("game", {
  state: (): GameStoreState => ({
    board: {
      currentPlayer: "X",
      gameState: "PLAYING",
      lastMove: null,
      squares: Array(9).fill(""),
      winningLine: null,
    },
    scores: {
      computer: 0,
      player: 0,
      tie: 0,
    },
  }),
});
