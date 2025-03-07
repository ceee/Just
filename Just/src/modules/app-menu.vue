<template>
  <aside class="menu" :class="{ 'is-open': open }">
    <img class="logo" src="/just.svg" :alt="$t('app.name')" />
    <nav class="navigation">
      <navigation-item v-for="list in lists" :key="list.id" :name="list.name" :active="currentList == list" symbol="ListTodo" @contextmenu.prevent="onListRightClicked($event, list)" />
      <navigation-item :name="$t('menu.lists.add')" symbol="ListPlus" :minor="true" />
      <ui-contextmenu ref="contextmenu">
        <ui-contextmenu-button label="Rename" symbol="TextCursorInput" @click="rename(currentList!)" />
        <ui-contextmenu-button label="Duplicate" symbol="CopyPlus" />
        <hr />
        <ui-contextmenu-button label="Delete" symbol="Trash" />
      </ui-contextmenu>
    </nav>
    <div class="menu-bottom">
      <navigation-item :name="$t('menu.settings')" symbol="Bolt" :minor="true" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import NavigationItem from './navigation-item.vue'
  import { onMounted, reactive, ref, useTemplateRef } from 'vue'
  import { taskLists } from '@/stores'
  import { type TaskList } from '@/models'
  import UiContextmenuButton from '@/components/ui-contextmenu-button.vue'

  interface Props {
    open?: boolean
  }
  const { open } = defineProps<Props>();

  let lists: TaskList[] = reactive<TaskList[]>([]);
  let currentList: TaskList | undefined;
  let currentEvent: PointerEvent | undefined;
  let $contextmenu = useTemplateRef('contextmenu');

  onMounted(async () =>
  {
    (await taskLists.getAll()).forEach(list =>
    {
      lists.push(list);
    });
    currentList = lists[0];
  });

  function onListRightClicked(ev: PointerEvent, list: TaskList)
  {
    currentList = list;
    $contextmenu.value!.show(ev);
  }

  function rename(list: TaskList)
  {
    console.info('rename: ' + list.name);
  }
</script>

<style scoped lang="scss">
  .menu
  {
    width: 260px;
    border-radius: var(--radius);
    background: var(--color-menu-bg);
    align-self: stretch;
    overflow-y: auto;
    padding: var(--space);
    display: grid;
    grid-template-rows: auto 1fr auto;

    @media (max-width: 700px)
    {
      height: calc(100vh - 2 * var(--space-m));
      position: absolute;
      transform: translateX(-110%);
      transition: transform 0.6s ease;
      pointer-events: none;

      &.is-open
      {
        transform: translateX(0);
        pointer-events: auto;
      }
    }
  }

  .logo
  {
    height: 30px;
  }

  .navigation
  {
    margin: var(--space) 0;
  }
</style>