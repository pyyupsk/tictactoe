<script setup lang="ts">
import ResetButton from "@/components/ResetButton.vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import TicTacToeBoard from "@/components/TicTacToeBoard.vue";
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <TicTacToeBoard />
    <ScoreBoard />
    <ResetButton />
  </main>
</template>
