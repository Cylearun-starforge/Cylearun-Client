import { GameMode } from './options';

export const GameMapSatelliteObjectTypes = ['player', 'ore', 'tech-oil', 'tech-building', 'text'] as const;

type GameMapSatelliteObjectType = typeof GameMapSatelliteObjectTypes[number];

type Location = `${number}px` | `${number}%`;

export type GameMapSatelliteObject = {
  x: Location;
  y: Location;
  type: GameMapSatelliteObjectType;
  extraText?: string;
};

export type GameMapSatellite = {
  image: string;
  objects: GameMapSatelliteObject[];
};

export type GameMap = {
  name: {
    zh: string;
    en: string;
  };
  cover: string;
  playerLimit: [number, number]; // [min, max]
  availableModes: GameMode[];
  satellites: GameMapSatellite[];
  description: string[];
};
