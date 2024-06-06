<template>
  <th class="p-2 text-left bg-primary-600 text-primary-50">
    <slot />
  </th>
</template>
<style scoped>
thead:first-child tr:first-child th:first-child,
tbody:first-child tr:first-child td:first-child {
  border-radius: 4px 0 0 0;
}
thead:last-child tr:last-child th:first-child,
tbody:last-child tr:last-child td:first-child {
  border-radius: 0 0 0 4px;
}
</style>
