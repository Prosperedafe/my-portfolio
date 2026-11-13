<script setup lang="ts">
// The "PE" monogram: a solid P, and an E drawn as three bars.
withDefaults(defineProps<{ size?: number }>(), { size: 40 })
</script>

<template>
  <svg
    class="logo"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    role="img"
    aria-label="Prosper Edafe logo"
  >
    <rect class="logo-bg" width="64" height="64" rx="15" />
    <path
      class="logo-p"
      fill-rule="evenodd"
      d="M11 14h12.5a11.5 11.5 0 0 1 0 23H20v13h-9V14Zm9 8v7h3.5a3.5 3.5 0 0 0 0-7H20Z"
    />
    <rect class="logo-bar" x="39" y="14" width="14" height="7" />
    <rect class="logo-bar" x="39" y="28.5" width="14" height="7" />
    <rect class="logo-bar" x="39" y="43" width="14" height="7" />
  </svg>
</template>

<style scoped>
.logo-bg {
  fill: var(--accent);
}
.logo-p,
.logo-bar {
  fill: var(--ink);
}
.logo-bar {
  transform-box: fill-box;
  transform-origin: left center;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
/* The E bars stretch in sequence when the logo is hovered */
.logo:hover .logo-bar,
a:hover .logo-bar {
  transform: scaleX(0.55);
}
.logo:hover .logo-bar:nth-of-type(3),
a:hover .logo-bar:nth-of-type(3) {
  transform: scaleX(1);
  transition-delay: 0.06s;
}
.logo:hover .logo-bar:nth-of-type(4),
a:hover .logo-bar:nth-of-type(4) {
  transform: scaleX(0.75);
  transition-delay: 0.12s;
}
</style>
