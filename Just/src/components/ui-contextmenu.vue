<template>
  <div class="ui-contextmenu-container" :class="{ 'is-open': open }">
    <div v-if="$slots.button" ref="trigger" class="ui-contextmenu-toggle" @click.prevent.stop="toggle">
      <slot name="button"></slot>
    </div>
    <div class="ui-contextmenu" ref="container" role="dialog" :hidden="!open" v-click-outside="hide">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch, useHost, useTemplateRef, defineExpose, nextTick } from 'vue';
  import cache from '@/utils/cache';

  const key = 'just.ui-contextmenu.current';
  const emit = defineEmits(['opened', 'closed']);

  interface Props {
    disabled?: boolean
  }
  const { disabled } = defineProps<Props>();
  const $container = useTemplateRef('container');
  let open = ref(false);


  // toggles the context menu
  function toggle()
  {
    return open ? hide() : show();
  }


  // try to show the context menu
  function show(ev?: PointerEvent | undefined)
  {
    if (disabled)
    {
      return;
    }

    // cache open context-menu so it can be auto-closed
    if (cache.has(key))
    {
      cache.get(key).hide();
    }
    cache.set(key, { hide });

    open.value = true;
    if (ev != null)
    {
      nextTick(() =>
      {
        reposition(ev);
      });
    }
    emit('opened');
  }


  // hide this context menu
  function hide()
  {
    console.info('hide');
    open.value = false;
    emit('closed');
    cache.delete(key);
  }


  function reposition({ pageY, pageX }: PointerEvent): void
  {
    const menuWidth = 100;
    const menuHeight = 300;

    let position = {
      left: pageX + 2 - (menuWidth + pageX >= window.innerWidth ? menuWidth : 0),
      top: pageY + 2 - (menuHeight + pageY >= window.innerHeight ? menuHeight : 0)
    };

    $container.value!.style.left = position.left + 'px';
    $container.value!.style.top = position.top + 'px';
  }


  defineExpose({
    show,
    hide,
    reposition
  })
</script>


<style lang="scss">
  .ui-contextmenu
  {
    --v-offset: 0px;
    position: absolute;
    min-width: 180px;
    min-height: 20px;
    background: var(--color-contextmenu-bg);
    border-radius: var(--radius);
    border: 1px solid var(--color-contextmenu-border);
    box-shadow: var(--color-contextmenu-shadow);
    z-index: 8;
    top: calc(100% + 5px);
    padding: 4px;
    color: var(--color-text);
    display: flex;
    flex-direction: column;

    &.align-right
    {
      right: 0;
    }

    &.align-top
    {
      top: calc(100% + 5px);
      bottom: auto;
    }

    &.align-bottom
    {
      bottom: calc(100% + 5px + var(--v-offset));
      top: auto;
    }

     hr
     {
      border: none;
      border-bottom: 1px solid var(--color-contextmenu-line); //var(--color-dropdown-line);
      margin: 4px 0;

      & + hr
      {
        display: none;
      }
    }
  }
</style>