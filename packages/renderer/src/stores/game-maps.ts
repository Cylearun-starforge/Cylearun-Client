import { defineStore } from 'pinia';
import { GameMap } from 'config/game/game-map';

export const useGameMaps = defineStore('gameMaps', {
  state: () => {
    const maps: GameMap[] = [
      {
        name: {
          zh: '围困之都',
          en: 'SIEGE OF',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 4],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
      {
        name: {
          zh: '围困之都2',
          en: 'SIEGE OF2',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 2],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
      {
        name: {
          zh: '围困之都8',
          en: 'SIEGE OF8',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 8],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
      {
        name: {
          zh: '围困之都7',
          en: 'SIEGE OF8',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 7],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
      {
        name: {
          zh: '围困之都6',
          en: 'SIEGE OF8',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 6],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
      {
        name: {
          zh: '围困之都5',
          en: 'SIEGE OF5',
        },
        cover: '/game/tmp_game_map.png',
        availableModes: ['标准对战[传统]'],
        playerLimit: [1, 5],
        satellites: [
          {
            image: '/game/map/preview/tmp_map.png',
            objects: [],
          },
        ],
      },
    ];
    return {
      maps,
    };
  },
});
