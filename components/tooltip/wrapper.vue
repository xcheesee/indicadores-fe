<script setup></script>
<template>
  <ClientOnly>
    <FadeinTransition>
      <div class="group relative transition-opacity" :class="$attrs.class">
        <slot></slot>
      </div>
    </FadeinTransition>
  </ClientOnly>
</template>
