<template>
  <button :disabled="disabled" type="button" @click.stop="onClick" class="ui-contextmenu-button">
    <ui-icon v-if="symbol" :symbol="symbol" class="ui-contextmenu-button-icon" />
    <span v-else class="ui-contextmenu-button-icon is-placeholder"></span>
    <span class="ui-contextmenu-button-label" v-text="label" :class="{ 'is-minor': minor }"></span>
  </button>
</template>

<script setup lang="ts">
  interface Props {
    label: string,
    symbol?: string,
    disabled?: boolean,
    autohide?: boolean,
    minor?: boolean
  }
  const { label, symbol, disabled, minor } = defineProps<Props>();

  function onClick(ev: Event)
  {
    console.info('clicked');
  }
</script>


<style lang="scss">
  .ui-contextmenu-button
  {
    appearance: none;
    height: 34px;
    border-radius: var(--radius-inner);
    display: grid;
    grid-template-columns: auto minmax(0, auto) 1fr;
    text-decoration: none;
    align-items: center;
    gap: var(--space-s);
    background: var(--color-contextmenu-item-bg);
    padding: 0 var(--space-m);
    width: 100%;
    //transition: background-color 0.2s ease;

    &[disabled]
    {
      pointer-events: none;
    }

    &:hover
    {
      cursor: pointer;
      background: var(--color-contextmenu-item-hover-bg);
    }
  }

  .ui-contextmenu-button-icon
  {
    height: 18px;
    stroke-width: 1.5px;
    color: var(--color-text-dim);
    margin-right: var(--space-s);
  }

  .ui-contextmenu-button-label
  {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-text);

    &.is-minor, .ui-contextmenu-button[disabled] &
    {
      color: var(--color-text-dim);
    }
  }
</style>