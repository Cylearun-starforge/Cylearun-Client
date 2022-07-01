<script lang="ts" setup>
import GameSwitch from './game-switch.vue';
import DropdownSelector from './dropdown-selector.vue';
import { GameOptionLabels, GameTimeSettings, GameFpsSettings, GameOptions } from 'config/game/game-options';
import { PropType } from 'vue';

defineProps({
  options: {
    type: Object as PropType<GameOptions>,
    required: true,
  },
});
defineEmits(['update:options']);
const leftSideOptions = [
  'crate',
  'fastGame',
  'radar',
  'allyInGame',
  'buildOnAlly',
  'autoRepair',
  'multiEngineer',
  'warFog',
  'hideLocation',
  'dayNight',
] as const;
</script>

<template>
  <div class="game-options-root flex">
    <div class="flex flex-col">
      <game-switch
        v-for="opt in leftSideOptions"
        :key="opt"
        :checked="options[opt].value"
        @update:checked="$emit('update:options', { ...options, [opt]: { value: $event } })"
        :disabled="options[opt].disabled"
        :text="GameOptionLabels[opt]"
      />
    </div>
    <div class="flex flex-col">
      <div class="flex">
        <div class="dropdown-desc">初始资金</div>
        <dropdown-selector
          :candidates="[{ display: `${options.fund.value}`, value: `${options.fund.value}` }]"
          :value="`${options.fund.value}`"
        />
      </div>
      <div class="flex">
        <div class="dropdown-desc">初始单位数</div>
        <dropdown-selector
          :candidates="[{ display: `${options.unit.value}`, value: `${options.unit.value}` }]"
          :value="`${options.unit.value}`"
        />
      </div>
      <div class="flex">
        <div class="dropdown-desc">游戏速度</div>
        <dropdown-selector
          :candidates="[
            {
              display: `${GameFpsSettings[options.fps.value]}(${options.fps.value}FPS)`,
              value: `${options.fps.value}`,
            },
          ]"
          :value="`${options.fps.value}`"
        />
      </div>
      <div class="flex">
        <div class="dropdown-desc">战场时间</div>
        <dropdown-selector
          :candidates="[
            {
              display: `${GameTimeSettings[options.time.value]}(${options.time.value})`,
              value: `${options.time.value}`,
            },
          ]"
          :value="`${options.time.value}`"
        />
      </div>
      <div class="flex">
        <div class="dropdown-desc">极端天气</div>
        <dropdown-selector
          :candidates="[
            { display: `${options.extremeWeather.value ? '' : '不'}启用`, value: `${options.extremeWeather.value}` },
          ]"
          :value="`${options.extremeWeather.value}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-options-root {
  width: 422px;
  padding: 4px;
  height: 236.8px;
  columns: 2;
  color: rgb(134, 200, 217) !important;
}

.game-options-root > div {
  width: 50%;
}

.dropdown-desc {
  word-break: keep-all;
  display: flex;
  align-items: center;
}
</style>
