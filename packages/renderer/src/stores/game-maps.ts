import { GameMap } from 'config/game/game-map';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGameMaps = defineStore('gameMaps', () => {
  const maps = reactive<GameMap[]>([]);
  window.callMain('loadMaps').then(m => {
    maps.push(...m);
  });
  window.onMain('map-load-single', (_, map) => {
    maps.push(map);
  });
  return {
    maps,
  };
});
