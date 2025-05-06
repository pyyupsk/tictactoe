<script setup lang="ts">
import { useMetaData } from "@/composables/useMetaData";

useMetaData({
  description:
    "Play Tic-Tac-Toe against AI! Challenge the computer using the Minimax algorithm and try to win!",
  title: "Tic-Tac-Toe vs AI (Minimax)",
});
</script>

<template>
  <RouterView />
</template>
