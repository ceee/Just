<template>
  hi
<!--  <RouterView />-->
</template>

<script setup lang="ts">
  import { posts } from '@/db';
  let items = posts.find().fetch();
  console.info(items);
</script>