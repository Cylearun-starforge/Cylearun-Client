<script setup lang="ts">
const { rc } = window;
</script>

<template>
  <div class="box">
    <img class="box" :src="rc('home', 'version_box.png')" />
    <img class="tag" :src="rc('home', 'version_tag.png')" />
  </div>
</template>

<style scoped>
img {
  position: absolute;
}

.box {
  width: 300px;
  height: 153px;
}

.tag {
  height: 96px;
  width: 211px;
  left: 28px;
  top: 44px;
}
</style>
