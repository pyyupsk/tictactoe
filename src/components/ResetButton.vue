<script setup lang="ts">
import { useGameBoard } from "@/composables/useGameBoard";
import { motion } from "motion-v";
import { computed } from "vue";

const { board, resetGame } = useGameBoard();

const message = computed(() =>
  board.value.gameState === "WON"
    ? "You Won! Click to play again"
    : board.value.gameState === "LOST"
      ? "You Lost! Click to try again"
      : board.value.gameState === "TIE"
        ? "It's a Tie! Click to play again"
        : null,
);
</script>

<template>
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
</template>
