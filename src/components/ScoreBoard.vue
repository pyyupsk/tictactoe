<script setup lang="ts">
import { useGameBoard } from "@/composables/useGameBoard";

const { scores } = useGameBoard();
</script>

<template>
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
</template>
