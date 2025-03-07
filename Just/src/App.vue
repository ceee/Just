<template>
  <div class="app">
    <app-menu :open="menuOpen" v-click-outside="closeMenu" />
    <main class="main">
      <header class="top">
        <img class="top-logo" src="/just.svg" :alt="$t('app.name')" />
        <button type="button" class="top-menu-toggle" @click.stop="menuOpen=!menuOpen">
          <ui-icon symbol="Menu" :size="18" :stroke-width="2" />
        </button>
        <button type="button" class="top-list">
          Shopping
          <ui-icon symbol="ChevronDown" :size="16" />
        </button>
      </header>
<!--      <button type="button" @click="preload">Preload</button>-->
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AppMenu from '@/modules/app-menu.vue'
  import { useResize } from '@/utils/composables'

  let menuOpen = ref(false);

  function closeMenu()
  {
    menuOpen.value = false;
  }

  let resizeTimeout: number | undefined = undefined;
  useResize(() =>
  {
    document.body.classList.add('is-resizing');
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() =>
    {
      document.body.classList.remove('is-resizing');
    }, 300);
  })
</script>

<style lang="scss" scoped>
  .main
  {
    padding: var(--space-m) 0;

    @media (max-width: 700px)
    {
      padding: var(--space-m);
    }
  }

  .top
  {
    color: var(--color-text-dim);
    display: flex;
    align-items: stretch;
    gap: var(--space-s);
  }

  .top-logo
  {
    height: 30px;
  }

  .top-menu-toggle
  {
    color: var(--color-text-dim);
    width: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover
    {
      color: var(--color-text);
    }
  }

  .top-logo, .top-menu-toggle
  {
    @media (min-width: 701px)
    {
      display: none;
    }
  }

  .top-list
  {
    color: var(--color-text-dim);
    display: inline-flex;
    align-items: center;
    gap: var(--space-s);
    font-weight: 500;
  }
</style>