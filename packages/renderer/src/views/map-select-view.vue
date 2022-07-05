<script lang="ts" setup>
import RightInfo from '@/components/skirmish/skirmish-right-info.vue';
defineEmits({
  close: null,
});
</script>

<template>
  <div class="map-select-view-root flex">
    <div class="map-selector-container"></div>
    <div class="map-select-preview flex">
      <div class="map-select-desc">
        <div style="width: 100%"></div>
      </div>
      <right-info @click1="$emit('close')" style="background-color: rgba(0, 0, 0, 0.6)" />
    </div>
  </div>
</template>

<style scoped>
.map-select-view-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  padding-right: 0;
  z-index: 10;
  gap: 12px;
}

.map-selector-container {
  width: 462px;
}

.map-select-preview {
  flex: 1;
  height: 100%;
}

.map-select-desc {
  flex: 1;
  height: 100%;
}
</style>
