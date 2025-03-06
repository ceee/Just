<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth" :default-class="defaultClass"
  />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import * as icons from "lucide-vue-next";

  const props = defineProps({
    symbol: {
      type: String,
      required: true
    },
    size: Number,
    color: String,
    strokeWidth: Number,
    defaultClass: String
  })

  const icon = computed(() => icons[props.symbol]);
</script>