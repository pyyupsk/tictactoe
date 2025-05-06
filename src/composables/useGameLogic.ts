import type { GameState, Player } from "@/types/game";

import { PLAYERS, WINNING_LINES } from "@/constants/game";

export function useGameLogic() {
  /**
   * Checks if a player has won
   * @param squares The current board state
   * @param player The player to check for a win
   * @returns The winning line indices or null if no win
   */
  const checkWin = (squares: Player[], player: Player): null | number[] => {
    return (
      WINNING_LINES.find((combination) =>
        combination.every((index) => squares[index] === player),
      ) || null
    );
  };

  /**
   * Checks if the game is a tie
   * @param squares The current board state
   * @returns True if the game is a tie, false otherwise
   */
  const checkTie = (squares: Player[]): boolean => {
    return squares.every((cell) => cell !== PLAYERS.EMPTY);
  };

  /**
   * Updates the game state based on the current board
   * @param squares The current board state
   * @returns The new game state and winning line (if any)
   */
  const updateGameState = (squares: Player[]): [GameState, null | number[]] => {
    const humanWinLine = checkWin(squares, PLAYERS.HUMAN);
    const aiWinLine = checkWin(squares, PLAYERS.AI);

    if (humanWinLine) return ["WON", humanWinLine];
    if (aiWinLine) return ["LOST", aiWinLine];
    if (checkTie(squares)) return ["TIE", null];

    return ["PLAYING", null];
  };

  /**
   * Gets all available empty cell indices from the board
   * @param squares The current board state
   * @returns Array of indices for empty cells
   */
  const getAvailableMoves = (squares: Player[]): number[] => {
    return squares.reduce<number[]>((acc, cell, index) => {
      if (cell === PLAYERS.EMPTY) acc.push(index);
      return acc;
    }, []);
  };

  return { checkTie, checkWin, getAvailableMoves, updateGameState };
}
