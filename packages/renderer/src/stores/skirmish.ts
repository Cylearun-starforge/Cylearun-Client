import { defineStore } from 'pinia';
import { Player } from 'config/game/player-type';
import { GameOptionConstructor } from 'config/game/game-options';

export const useSkirmish = defineStore('skirmish', {
  state: () => ({
    players: [] as Player[],
    maxPlayers: 8,
    options: new GameOptionConstructor['标准对战[传统]'](),
    selectingSide: false,
  }),
});
