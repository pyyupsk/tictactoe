import type { GameState } from "@/types/game";

import { useGameStore } from "@/stores/game";
import { computed } from "vue";

export function useScoreManager() {
  const gameStore = useGameStore();
  const scores = computed(() => gameStore.scores);

  /**
   * Updates the score based on the game state
   * @param gameState The current game state
   */
  const updateScore = (gameState: GameState): void => {
    if (gameState === "PLAYING") return;

    const scoreKey = gameState === "WON" ? "player" : gameState === "LOST" ? "computer" : "tie";

    gameStore.scores = {
      ...scores.value,
      [scoreKey]: scores.value[scoreKey] + 1,
    };
  };

  return { scores, updateScore };
}
