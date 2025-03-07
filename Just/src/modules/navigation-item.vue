<template>
  <button type="button" class="navigation-item" :class="classes">
    <ui-icon :symbol="symbol" class="navigation-item-icon" />
    <span v-if="!editing" class="navigation-item-text" v-text="name"></span>
    <span v-else>
      <input type="text" v-model="nameModel" class="navigation-item-input" />
    </span>
    <span class="navigation-item-count" v-if="count > 0" v-text="count"></span>
  </button>
</template>

<script setup lang="ts">
  import { reactive, ref, defineExpose } from 'vue'

  interface Props {
    symbol: string,
    name: string,
    count?: number,
    active?: boolean,
    minor?: boolean,
    canSetName?: boolean
  }

  const { symbol, name, count = 0, active, minor, canSetName } = defineProps<Props>();
  const editing = ref(false);
  const nameModel = ref(name);
  const classes = reactive({
    'is-active': active,
    'is-list': !minor
  })


  function edit()
  {
    this.editing = true;
  }

  defineExpose({
    edit
  });
</script>

<style scoped lang="scss">
  .navigation-item
  {
    appearance: none;
    height: 38px;
    border-radius: var(--radius-inner);
    display: grid;
    grid-template-columns: auto minmax(0, auto) 1fr;
    text-decoration: none;
    align-items: center;
    gap: var(--space-s);
    background: transparent;
    padding: 0 var(--space-m);
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
    margin-right: var(--space-s);
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

  .navigation-item-input
  {

  }
</style>