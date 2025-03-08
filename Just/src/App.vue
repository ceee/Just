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
      <div class="editor">
        <input type="text" placeholder="Add a task" class="editor-input" />
        <ui-icon symbol="CirclePlus" class="editor-add-icon" />
      </div>
      <ul class="tasks">
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Haferflocken</span>
        </li>
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Cashewkerne</span>
        </li>
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Creme (sensitiv)</span>
        </li>
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Kreuzkümmel</span>
        </li>
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Vanille</span>
        </li>
        <li class="task">
          <label class="task-check">
            <input type="checkbox" />
            <span class="task-check-input"></span>
          </label>
          <span class="task-text">Parfüm</span>
        </li>
        <li class="task is-done">
          <label class="task-check">
            <input type="checkbox" checked />
            <span class="task-check-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check task-check-symbol">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </span>
          </label>
          <span class="task-text">Zahnseide</span>
        </li>
      </ul>
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
    @media (max-width: 700px)
    {
      padding: 0 var(--space-m);
    }
  }

  .top
  {
    color: var(--color-text-dim);
    display: flex;
    align-items: stretch;
    gap: var(--space-s);
    padding: var(--space-m) 0;
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

  .editor
  {
    position: relative;
    margin-top: var(--space-m);
  }

  .editor-input
  {
    width: 100%;
    appearance: none;
    background: var(--color-bg-shade-3);
    border: 1px solid var(--color-bg-shade-4);
    border-radius: var(--radius);
    height: 48px;
    color: var(--color-text);
    padding-left: 46px;

    &:focus
    {
      outline: none;
    }
  }

  .editor-add-icon
  {
    position: absolute;
    left: var(--space-m);
    top: 50%;
    height: 20px;
    margin-top: -10px;
    stroke-width: 1.5px;
    color: var(--color-text-dim);
    pointer-events: none;
  }


  .tasks
  {
    list-style: none;
    padding: 0;
    padding-left: 1px;
    padding-top: var(--space);
  }

  .task
  {
    list-style: none;
    border: 1px solid transparent;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
  }

  .task-check
  {
    display: inline-flex;
    padding: var(--space-sm) var(--space-m);
    padding-right: var(--space);

    input
    {
      position: absolute;
      visibility: hidden;
    }
  }

  .task-check-input
  {
    height: 16px;
    aspect-ratio: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid var(--color-text-dim);
  }

  .task-check-symbol
  {
    height: 7px;
    aspect-ratio: 1;
    stroke-width: 4px;
    color: var(--color-text-dim);
  }

  .task-text
  {
    .task.is-done &
    {
      color: var(--color-text-dim);
      text-decoration: line-through;
      font-weight: 300;
    }
  }
</style>