<script setup></script>

<template>
  <table class="">
    <thead class="">
      <slot name="head" />
    </thead>
    <tbody>
      <slot name="body" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  border: 1px solid #ddd;
  border-collapse: separate;
  border-radius: 4px;
  border-spacing: 0px;
}

thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  border-collapse: separate;
}
</style>
