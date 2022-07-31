<script lang="ts" setup>
import { StyleValue, PropType, computed } from 'vue';
const props = defineProps({
  src: String,
  alt: String,
  class: String,
  style: Object as PropType<StyleValue>,
});

const imgSrc = computed(() => {
  return define.__PROD__ ? '.' + props.src : props.src;
});
</script>

<template>
  <img :src="imgSrc" :alt="alt" :class="props.class" :style="style" />
</template>
