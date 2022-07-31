import { GameMap } from '@cylearun/game/lib/map';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGameMaps = defineStore('gameMaps', () => {
  const maps = reactive<GameMap[]>([]);
  runtime.invokes.loadMaps().then(m => {
    maps.push(...m);
  });
  runtime.emits.onLoadSingleMap(map => {
    maps.push(map);
  });

  return {
    maps,
  };
});
