import clickO from "@/assets/sounds/click-o.mp3";
import clickX from "@/assets/sounds/click-x.mp3";
import gameOver from "@/assets/sounds/game-over.mp3";
import tie from "@/assets/sounds/tie.mp3";
import { useSound } from "@vueuse/sound";

export function useGameSound() {
  const { play: playClickO } = useSound(clickO);
  const { play: playClickX } = useSound(clickX);
  const { play: playGameOver } = useSound(gameOver);
  const { play: playTie } = useSound(tie);

  return {
    playClickO,
    playClickX,
    playGameOver,
    playTie,
  };
}
