import type { GameState, Player } from "@/types/game";

import { useAIPlayer } from "@/composables/useAIPlayer";
import { useGameLogic } from "@/composables/useGameLogic";
import { useGameSound } from "@/composables/useGameSound";
import { useScoreManager } from "@/composables/useScoreManager";
import { AI_MOVE_DELAY, PLAYERS } from "@/constants/game";
import { useGameStore } from "@/stores/game";
import { computed } from "vue";

export function useGameBoard() {
  const gameStore = useGameStore();
  const sound = useGameSound();
  const gameLogic = useGameLogic();
  const aiPlayer = useAIPlayer();
  const scoreManager = useScoreManager();

  const board = computed(() => gameStore.board);
  const scores = computed(() => gameStore.scores);

  /**
   * Makes a move for a player
   * @param index Board position index
   * @param player The player making the move
   * @returns Updated game state and winning line
   */
  const makeMove = (index: number, player: Player): [GameState, null | number[]] => {
    // Create a new board copy
    const newSquares = [...board.value.squares];
    newSquares[index] = player;

    // Update game state
    const [newGameState, winLine] = gameLogic.updateGameState(newSquares);

    // Update store
    gameStore.board = {
      ...board.value,
      currentPlayer: player === PLAYERS.HUMAN ? PLAYERS.AI : PLAYERS.HUMAN,
      gameState: newGameState,
      lastMove: index,
      squares: newSquares,
      winningLine: winLine,
    };

    return [newGameState, winLine];
  };

  /**
   * Handles the AI's turn
   */
  const handleAITurn = (): void => {
    // Don't make a move if the game is over
    if (board.value.gameState !== "PLAYING") return;

    setTimeout(() => {
      const bestMoveIndex = aiPlayer.getBestMove(board.value.squares);

      if (bestMoveIndex !== -1) {
        // Play sound before making the move
        sound.playClickO();

        const [finalGameState] = makeMove(bestMoveIndex, PLAYERS.AI);

        // Update score if game is over
        if (finalGameState !== "PLAYING") {
          scoreManager.updateScore(finalGameState);

          // Play appropriate sound
          if (finalGameState === "TIE") {
            sound.playTie();
          } else {
            sound.playGameOver();
          }
        }
      }
    }, AI_MOVE_DELAY);
  };

  /**
   * Handles a player click on a cell
   * @param index The index of the clicked cell
   */
  const handleClick = (index: number): void => {
    // Validate move
    if (
      board.value.squares[index] !== PLAYERS.EMPTY ||
      board.value.gameState !== "PLAYING" ||
      board.value.currentPlayer !== PLAYERS.HUMAN
    ) {
      return;
    }

    // Play sound before making the move
    sound.playClickX();

    const [newGameState] = makeMove(index, PLAYERS.HUMAN);

    // Update score if game ended
    if (newGameState !== "PLAYING") {
      scoreManager.updateScore(newGameState);

      if (newGameState === "TIE") {
        sound.playTie();
      } else {
        sound.playGameOver();
      }
      return;
    }

    // Handle AI turn if game continues
    handleAITurn();
  };

  /**
   * Resets the game to initial state
   */
  const resetGame = (): void => {
    gameStore.board = {
      currentPlayer: PLAYERS.HUMAN,
      gameState: "PLAYING",
      lastMove: null,
      squares: Array(9).fill(PLAYERS.EMPTY),
      winningLine: null,
    };
  };

  return { board, handleClick, resetGame, scores };
}
