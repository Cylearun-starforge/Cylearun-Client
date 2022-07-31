import { GameMap } from '@cylearun/game/lib/map';
export type IpcEventToRenderer = {
  'map-load-single': [GameMap];
};

type ListenerCallback<T extends unknown[]> = (...args: [...T]) => void;

export type MainProcessEmittable = {
  onLoadSingleMap(callback: ListenerCallback<[GameMap]>): void;
};
