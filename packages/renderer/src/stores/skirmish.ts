import { defineStore } from 'pinia';
import { Player } from 'config/game/player-type';
import { GameOptionConstructor } from 'config/game/game-options';
import { GameMap } from 'config/game/game-map';
import { ref } from 'vue';

export const useSkirmish = defineStore('skirmish', {
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

    const players: Player[] = [
      {
        type: 'human',
        info: {
          avatar: '/user/avatar.png',
          avatarBox: '/user/box.png',
          card: '/user/info_card.png',
          level: '/user/level.png',
          username: '用户名test',
          color: '#0096C3',
          location: 1,
          side: 'fue',
          team: 'A',
        },
      },
      {
        type: 'bot',
        info: {
          style: 'random',
          difficulty: 'hard',
          color: '#00C396',
          location: 1,
          side: 'allied',
          team: 'B',
        },
      },
    ];
    return {
      players,
      maxPlayers: 8,
      options: new GameOptionConstructor['标准对战[传统]'](),
      selectingSide: false,
      selectedMapIndex: 0,
      maps,
    };
  },
  getters: {
    currentMap(state) {
      return state.maps[state.selectedMapIndex];
    },
  },
});
