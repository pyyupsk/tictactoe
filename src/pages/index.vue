<script setup lang="ts">
import { useGameBoard } from "@/composables/useGameBoard";
import { motion } from "motion-v";
import { computed } from "vue";

const { board, handleClick, resetGame, scores } = useGameBoard();

const message = computed(() =>
  board.value.gameState === "WON"
    ? "You Won! Click to play again"
    : board.value.gameState === "LOST"
      ? "You Lost! Click to try again"
      : board.value.gameState === "TIE"
        ? "It's a Tie! Click to play again"
        : null,
);

const getCellClasses = (cellIndex: number) => {
  const baseClass =
    "aspect-square flex items-center justify-center border-foreground transition-all duration-300";
  const borderClass = [
    cellIndex >= 3 && "border-t-4",
    cellIndex <= 5 && "border-b-4",
    cellIndex % 3 !== 0 && "border-l-4",
    cellIndex % 3 !== 2 && "border-r-4",
  ].join(" ");

  const textColorClass =
    board.value.gameState === "TIE"
      ? "text-muted-foreground"
      : board.value.winningLine
        ? board.value.winningLine.includes(cellIndex)
          ? "text-foreground"
          : "text-muted-foreground"
        : "text-foreground";

  return `${baseClass} ${borderClass} ${textColorClass}`;
};
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <section class="pointer-events-auto relative mb-12 grid w-full max-w-xl grid-cols-3">
      <button
        v-for="(square, index) in board.squares"
        :key="index"
        :aria-label="`Cell ${index + 1} - ${square ? square : 'Empty'}`"
        :class="getCellClasses(index)"
        :disabled="square !== '' || board.gameState !== 'PLAYING'"
        @click="handleClick(index)"
      >
        <span
          v-show="square"
          :class="[
            square === 'X' ? 'x' : 'o',
            board.gameState === 'TIE'
              ? 'animate-blink'
              : board.winningLine?.includes(index) && 'animate-blink',
          ]"
        />
      </button>
    </section>

    <section class="grid grid-cols-3">
      <div class="flex flex-col items-center">
        <h2 class="mb-1 text-sm md:text-lg lg:text-xl">PLAYER (X)</h2>
        <div class="font-sans text-xl font-semibold md:text-2xl lg:text-3xl">
          {{ scores.player }}
        </div>
      </div>
      <div class="flex flex-col items-center">
        <h2 class="mb-1 text-sm md:text-lg lg:text-xl">TIE</h2>
        <div class="font-sans text-xl font-semibold md:text-2xl lg:text-3xl">{{ scores.tie }}</div>
      </div>
      <div class="flex flex-col items-center">
        <h2 class="mb-1 text-sm md:text-lg lg:text-xl">COMPUTER (O)</h2>
        <div class="font-sans text-xl font-semibold md:text-2xl lg:text-3xl">
          {{ scores.computer }}
        </div>
      </div>
    </section>

    <!-- Overlay button -->
    <motion.button
      v-show="message"
      id="reset-button"
      :animate="{ opacity: 1 }"
      aria-label="Reset game"
      :class="[
        'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2',
        'items-center justify-center rounded-xl px-4 py-2',
        'bg-background/50 text-3xl font-bold backdrop-blur-sm',
      ]"
      :initial="{ opacity: 0 }"
      :transition="{ duration: 0.3 }"
      @click="resetGame"
    >
      {{ message }}
    </motion.button>
  </main>
</template>
