<script setup></script>
<template>
  <tr>
    <slot />
  </tr>
</template>
<style scoped>
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

tr:nth-of-type(even) {
  background-color: #d4f7e2;
}
</style>
