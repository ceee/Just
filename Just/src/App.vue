<template>
  <aside class="menu">
    <img class="logo" src="/just.svg" :alt="$t('app.name')" />
    <nav class="navigation">
      <navigation-item name="Shopping" symbol="ListTodo" :active="true" :count="7" />
      <navigation-item name="Work" symbol="ListTodo" :count="702" />
      <navigation-item name="Apartment" symbol="ListTodo" />
      <navigation-item name="Add a list" symbol="ListPlus" :minor="true" />
    </nav>
    <div class="menu-bottom">
      <navigation-item name="Settings" symbol="Bolt" :minor="true" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import NavigationItem from '@/components/navigation-item.vue';
  import { posts } from '@/db';

  let items = posts.find().fetch();
  console.info(items);
</script>

<style lang="scss" scoped>
  .menu
  {
    width: 260px;
    margin: 10px;
    border-radius: 8px;
    background: var(--color-menu-bg);
    height: calc(100vh - 20px);
    overflow-y: auto;
    padding: 16px;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
  }

  .logo
  {
    width: 30px;
  }

  .navigation
  {
    margin-top: 12px;
  }
</style>