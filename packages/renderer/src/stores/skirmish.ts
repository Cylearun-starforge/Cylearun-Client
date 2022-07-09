import { defineStore } from 'pinia';
import { Player } from 'config/game/player-type';
import { GameOptionConstructor } from 'config/game/game-options';
import { useGameMaps } from './game-maps';

export const useSkirmish = defineStore('skirmish', {
  state: () => {
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
    };
  },
  getters: {
    currentMap(state) {
      const maps = useGameMaps();
      return maps.maps[state.selectedMapIndex];
    },
  },
});
