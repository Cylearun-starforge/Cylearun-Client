<script lang="ts" setup>
import { PropType } from 'vue';

type CandidateItem = {
  display: string;
  value: string;
};

const props = defineProps({
  candidates: {
    type: Array as PropType<CandidateItem[]>,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

defineEmits(['update:value']);
</script>

<template>
  <div class="dropdown-selector-root">
    <div class="dropdown-selected-item flex">
      {{ candidates.find(item => item.value === value)?.display }}
    </div>
    <button class="dropdown-button" @click="$emit('update:value', 123)"></button>
  </div>
</template>

<style scoped>
.dropdown-selector-root {
  width: 196px;
  height: 50px;
}

.dropdown-selected-item {
  background-image: url('/game/dropdown_selector_box.png');
  background-size: 100% 100%;
  width: 90.82%;
  height: 100%;
  padding: 0 12px;
  align-items: center;
}

.dropdown-button {
  background-image: url('/game/dropdown_button.png');
  background-color: transparent;
  border-width: 0;
  background-size: 100% 100%;
  width: 19.39%;
  height: 76%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.dropdown-button:hover {
  cursor: pointer;
}
</style>
