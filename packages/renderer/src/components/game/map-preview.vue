<script lang="ts" setup>
import { PropType } from 'vue';

type MapName = {
  zh: string;
  en: string;
};

defineProps({
  playerCount: {
    type: Object as PropType<[number, number]>,
    required: true,
  },
  mapName: {
    type: Object as PropType<MapName>,
    required: true,
  },
});
</script>

<template>
  <div class="map-preview-root">
    <img class="preview-border" src="/game/map_preview_box.png" draggable="false" />
    <img class="map-preview" src="/game/tmp_game_map.png" draggable="false" />
    <div class="desc">
      <div class="en">{{ mapName.en }}</div>
      <div class="zh">{{ mapName.zh }}</div>
    </div>
    <div class="player-count-box">
      <div class="extra-gradient flex">
        <div class="count">{{ playerCount[0] }} - {{ playerCount[1] }}</div>
        <div>Players</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-preview-root {
  width: 100%;
}

.preview-border {
  width: 100%;
  object-fit: contain;
  z-index: 10;
}

.map-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.desc {
  position: absolute;
  right: 30px;
  bottom: 24px;
  text-align: right;
  --shadow-blur-color: 2px rgba(0, 0, 0, 0.8);
  text-shadow: 2px 0 var(--shadow-blur-color), -2px 0 var(--shadow-blur-color), 0 var(--shadow-blur-color),
    0 -2px var(--shadow-blur-color);
  color: rgb(153, 188, 235);
}

.desc > .en {
  font-size: 46px;
}

.desc > .zh {
  font-size: 24px;
  font-family: '汉仪细等线';
  font-weight: bolder;
}

.player-count-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  left: 30px;
  top: 24px;
  background-image: linear-gradient(to right, rgba(3, 98, 161, 0.48) 0 35%, transparent);
  padding: 2px 0;
}

.player-count-box > .extra-gradient {
  width: 100%;
  padding: 4px;
  background-image: linear-gradient(to right, rgba(3, 98, 161, 0.68) 0 35%, transparent);
  align-items: flex-end;
}

.player-count-box div {
  font-family: BureauAgency;
  font-size: 20px;
}

.player-count-box .count {
  font-size: 40px;
  margin-right: 4px;
}
</style>
