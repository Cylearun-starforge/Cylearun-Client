<script setup lang="ts">
import SkirmishBackground from '@/components/skirmish/skirmish-background.vue';
import UserInfo from '@/components/home/user/user-info.vue';
import AlphaButton from '@/components/alpha-button.vue';
import { RouterLink } from 'vue-router';
</script>
<template>
  <skirmish-background />
  <div class="campaign-view-root"></div>
</template>

<style scoped>
.campaign-view-root {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
