<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <router-link
          to="/"
          style="color: white; text-decoration: none"
        >
          <q-toolbar-title>
            Task Manager
          </q-toolbar-title>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container class="b-conteiner">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
