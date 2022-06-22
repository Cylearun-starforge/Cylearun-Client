<script setup lang="ts">
import Background from '@/components/home/background.vue';
import ScrollInfo from '@/components/home/scroll-info.vue';
import ButtonGroup from '@/components/home/button-group.vue';
</script>

<template>
  <background />
  <div class="col-separator flex">
    <div class="left flex flex-col">
      <div class="top">
        <scroll-info />
      </div>
      <div class="bottom">
        <button-group />
      </div>

    </div>
    <div class="left flex flex-col">
    </div>
  </div>
</template>

<style scoped>
.col-separator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  gap: 12px;
  padding: 12px;

}

.left {
  height: 100%;
  width: 100%;
}

.left>.top {
  height: 35%;
  width: 100%;
}

.left>.bottom {
  width: 100%;
  height: 64.3%;
}
</style>
