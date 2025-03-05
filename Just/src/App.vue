<template>
  <aside class="sidebar">
    <img class="logo" src="/just.svg" :alt="$t('app.name')" />
  </aside>
</template>

<script setup lang="ts">
  import { posts } from '@/db';
  let items = posts.find().fetch();
  console.info(items);
</script>