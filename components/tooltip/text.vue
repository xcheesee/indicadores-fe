<script setup></script>
<template>
  <div
    class="invisible absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 transition-opacity group-hover:visible group-focus-within:visible group-focus-within:opacity-100 group-hover:opacity-100"
  >
    <div class="mt-1 rounded bg-white px-2 opacity-80">
      <slot></slot>
    </div>
  </div>
</template>
