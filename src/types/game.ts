export type GameBoard = {
  currentPlayer: Player;
  gameState: GameState;
  lastMove: null | number;
  squares: Player[];
  winningLine: null | number[];
};

export type GameState = "LOST" | "PLAYING" | "TIE" | "WON";

export type Player = "" | "O" | "X";

export type Score = {
  computer: number;
  player: number;
  tie: number;
};
