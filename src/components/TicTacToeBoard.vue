<script setup lang="ts">
import { useGameBoard } from "@/composables/useGameBoard";

const { board, handleClick } = useGameBoard();

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
</template>
