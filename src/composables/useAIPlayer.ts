import type { Player } from "@/types/game";

import { useGameLogic } from "@/composables/useGameLogic";
import { PLAYERS } from "@/constants/game";

export function useAIPlayer() {
  const { checkWin, getAvailableMoves } = useGameLogic();

  /**
   * Implements the minimax algorithm with alpha-beta pruning
   * @param squares Current board state
   * @param player Current player
   * @param depth Current depth in the game tree
   * @param alpha Alpha value for pruning
   * @param beta Beta value for pruning
   * @returns Best move index and score
   */
  const minimax = (
    squares: Player[],
    player: Player,
    depth: number = 0,
    alpha: number = -Infinity,
    beta: number = Infinity,
  ): { index: number; score: number } => {
    const availableSpots = getAvailableMoves(squares);

    // Terminal states
    if (checkWin(squares, PLAYERS.HUMAN)) return { index: -1, score: -10 + depth };
    if (checkWin(squares, PLAYERS.AI)) return { index: -1, score: 10 - depth };
    if (availableSpots.length === 0) return { index: -1, score: 0 };

    let bestMove: { index: number; score: number } = {
      index: -1,
      score: player === PLAYERS.AI ? -Infinity : Infinity,
    };

    // Explore possible moves
    for (const spot of availableSpots) {
      squares[spot] = player;
      const result = minimax(
        squares,
        player === PLAYERS.AI ? PLAYERS.HUMAN : PLAYERS.AI,
        depth + 1,
        alpha,
        beta,
      );
      squares[spot] = PLAYERS.EMPTY; // Undo move

      // Update best move
      if (player === PLAYERS.AI) {
        if (result.score > bestMove.score) {
          bestMove = { index: spot, score: result.score };
        }
        alpha = Math.max(alpha, result.score);
      } else {
        if (result.score < bestMove.score) {
          bestMove = { index: spot, score: result.score };
        }
        beta = Math.min(beta, result.score);
      }

      // Alpha-beta pruning
      if (beta <= alpha) break;
    }

    return bestMove;
  };

  /**
   * Gets the best move for the AI player
   * @param squares Current board state
   * @returns The index of the best move or -1 if no moves available
   */
  const getBestMove = (squares: Player[]): number => {
    const availableMoves = getAvailableMoves(squares);

    // Optimization: If first move, choose center or corner
    if (availableMoves.length === 9) {
      return 4; // Center is often a good first move
    }

    // Optimization: If second move and center is taken, choose a corner
    if (availableMoves.length === 8 && squares[4] === PLAYERS.HUMAN) {
      const corners = [0, 2, 6, 8];
      return corners[Math.floor(Math.random() * corners.length)];
    }

    const bestMove = minimax(squares, PLAYERS.AI);
    return bestMove.index;
  };

  return { getBestMove };
}
