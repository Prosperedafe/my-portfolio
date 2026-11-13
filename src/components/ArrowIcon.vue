<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 14 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="square"
    aria-hidden="true"
  >
    <path d="M2 12 12 2M4 2h8v8" />
  </svg>
</template>
