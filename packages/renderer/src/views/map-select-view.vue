<script lang="ts" setup>
import RightInfo from '@/components/skirmish/skirmish-right-info.vue';
import MapPreview from '@/components/game/map-preview.vue';
import { useSkirmish } from '@/stores/skirmish';
import MapList from '@/components/map-selector/map-list.vue';

const skirmish = useSkirmish();

defineEmits({
  close: null,
});
</script>

<template>
  <div class="map-select-view-root flex">
    <map-list :maps="skirmish.maps" v-model:selected-index="skirmish.selectedMapIndex"></map-list>
    <div class="map-select-preview flex">
      <div class="map-select-desc flex flex-col">
        <map-preview :map="skirmish.currentMap" />
        <div class="map-desc">
          “呜↗ ↗ ↗ ↗（战 术 前
          摇）太好听了吧！你唱歌真的好好听啊，简直就是天籁！我刚才，听到你唱歌了（你刚才，唱歌了罢）。我们以后一起唱好不好？一起唱！一起做学园偶像！”<br />
          “为什么要跑嘛？人家只是想和你一起做学园偶像而已呀！和我一起做学园偶像好不好嘛！”<br />
          “你快点掐（亲）一下可可的脸啊！”<br />
          “真爱，这是真爱啊！”<br />
          “嘿，哟，切克闹，唐可可我最闪耀，煎饼果子来一套，坚持练习不迟到，动次打次药！”[4] “真的假的！”
          “是雪（嗜血）！”<br />
        </div>
      </div>
      <right-info
        @click1="$emit('close')"
        top-text-zh="返回"
        top-text-en="BACK"
        style="background-color: rgba(0, 0, 0, 0.6)"
      />
    </div>
  </div>
</template>

<style scoped>
.map-select-view-root {
  color: rgb(134, 200, 217);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  padding-right: 0;
  z-index: 10;
  gap: 12px;
  background-color: rgba(0, 0, 0, 0.7);
}

.map-selector-container {
  width: 462px;
  align-items: center;
  padding: 40px;
}

.mode-filter {
  align-items: center;
  justify-content: center;
  font-family: '汉仪细等线';
  font-size: 20px;
  font-weight: bolder;
}

.map-list-container {
  flex: 1;
  width: 100%;
  height: 0;
}

.map-list {
  flex: 1;
  width: 100%;
  height: 100%;
  background-image: url('/game/map/map_box.png'), url('/game/map/map_box_bg.png');
  background-size: 100% 100%;
  margin-right: 20px;
  clip-path: polygon(12% 1%, 1.2% 6%, 1.2% 99%, 88% 99.1%, 98.5% 93.9%, 98.5% 1%);
  align-items: center;
  padding: 12px;
}

.map-list > div {
  height: 100%;
  width: 100%;
  clip-path: polygon(10.2% 0%, 0 4.7%, 0 100%, 90.1% 100%, 100% 95.5%, 100% 0%);
}

.map-scrollbar {
  width: 20px;
  height: 100%;
  background-image: url('/game/scroll_bg.png');
  background-size: 100% 100%;
}

.map-select-preview {
  flex: 1;
  height: 100%;
}

.map-select-desc {
  flex: 1;
  height: 100%;
  gap: 12px;
}

.map-desc {
  background-image: url('/text_box.png');
  background-size: 100% 100%;
  padding: 28px;
  width: 100%;
  height: 100%;
  font-family: '汉仪细等线';
  font-size: 20px;
}
</style>
