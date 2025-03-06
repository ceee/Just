<template>
  <button type="button" class="navigation-item" :class="classes">
    <ui-icon :symbol="symbol" class="navigation-item-icon" />
    <span class="navigation-item-text" v-text="name"></span>
    <span class="navigation-item-count" v-if="count > 0" v-text="count"></span>
  </button>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  interface Props {
    symbol: string,
    name: string,
    count?: number,
    active?: boolean,
    minor?: boolean
  }

  const { symbol, name, count = 0, active, minor } = defineProps<Props>();

  const classes = reactive({
    'is-active': active,
    'is-list': !minor
  })
</script>

<style scoped lang="scss">
  .navigation-item
  {
    appearance: none;
    height: 38px;
    border-radius: 6px;
    display: grid;
    grid-template-columns: auto minmax(0, auto) 1fr;
    text-decoration: none;
    align-items: center;
    gap: 8px;
    background: transparent;
    padding: 0 12px;
    width: 100%;
    border: 1px solid transparent;
    cursor: pointer;
    //transition: background-color 0.2s ease;

    &.is-active, &:hover
    {
      background: var(--color-menu-item-hover-bg);

      .navigation-item-count
      {
        background: var(--color-menu-item-hover-count-bg);
      }
    }
  }

  .navigation:has(.navigation-item:not(.is-active):hover)
  {
    .navigation-item.is-active
    {
      background: transparent;
    }
    .navigation-item.is-active .navigation-item-count
    {
      background: var(--color-menu-item-count-bg);
    }
  }

  .navigation-item-icon
  {
    height: 20px;
    stroke-width: 1.5px;
    color: var(--color-text-dim);
    margin-right: 8px;
  }

  .navigation-item-text
  {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-text-dim);

    .navigation-item.is-list &
    {
      font-weight: 500;
      color: var(--color-text);
    }
  }

  .navigation-item-count
  {
    height: 16px;
    justify-self: start;
    min-width: 16px;
    padding: 0 6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 0.6em;
    background: var(--color-menu-item-count-bg);
    color: var(--color-text-dim);
    //transition: background-color 0.2s ease;
  }
</style>