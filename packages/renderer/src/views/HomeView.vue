<script setup lang="ts">
import Background from '@/components/home/background.vue';
import ScrollInfo from '@/components/home/scroll-info.vue';
import ButtonGroup from '@/components/home/button-group.vue';
import LadderPanel from '@/components/home/ladder-panel.vue';
import VersionTag from '@/components/home/version-tag.vue';
</script>

<template>
  <background />
  <div class="row flex">
    <div class="col flex flex-col">
      <div class="top">
        <scroll-info />
      </div>
      <div class="bottom">
        <button-group />
      </div>

    </div>
    <div class="col flex flex-col">
      <div class="flex">
        <ladder-panel />
        <img src="/home/buttons/button_logo.png" class="logo-button">
      </div>
    </div>
  </div>
  <version-tag class="version-tag" />
</template>

<style scoped>
.row {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  gap: 12px;
  padding: 12px;

}

.col {
  height: 100%;
  width: 100%;
}

.col>.top {
  height: 35%;
  width: 100%;
}

.col>.bottom {
  width: 100%;
  height: 64.3%;
}

.logo-button {
  position: absolute;

  right: 0;
  top: 3.80%;
}

.version-tag {
  position: absolute;
  bottom: 12px;
  left: 12px;
}
</style>
