import { GameMap } from '@cylearun/game/lib/map';

export type ClientIpcInvokes = {
  closeApp(): Promise<void>;
  loadMaps(): Promise<GameMap[]>;
  combinePath(...paths: string[]): Promise<string>;
};
