<template>
  <q-page class="row items-center justify-evenly">
    <router-link
      to="tasks"
      class="rout-btn"
    >
      Перейти к задачам
    </router-link>
  </q-page>
</template>

<script setup lang="ts">
</script>
<style scoped lang="scss">
.rout-btn {
  text-decoration: none;
  font-size: 24px;
  color: white;
  background: $primary;
  padding: 15px 20px;
  border-radius: 10px;
}
</style>
