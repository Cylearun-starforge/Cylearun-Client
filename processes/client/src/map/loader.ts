import { join } from 'node:path';
import { GameMap } from '@cylearun/game/lib/map';
import { opendir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import mapSchema from './map.schema.json';
import Validator, { ValidateFunction } from 'ajv';
import { Paths } from '../path';

export class MapLoader {
  public static MetaFile = 'map.json';

  public loadedMaps: GameMap[] = [];
  public validator: ValidateFunction<typeof mapSchema>;

  private _readMapPromise: Promise<void> = new Promise(() => {
    // We never call resolve, so this promise is always pending
  });

  constructor() {
    this.validator = new Validator().compile(mapSchema);
  }

  get mapDir() {
    return Paths.combine(['appPath', 'map']);
  }

  async readMaps() {
    console.log('MAP', Paths.appPath, this.mapDir);
    const dir = await opendir(this.mapDir);
    for await (const mapFolder of dir) {
      if (mapFolder.isDirectory()) {
        const map = await this.readMapFromDir(join(this.mapDir, mapFolder.name));
        if (map) {
          this.loadedMaps.push(map);
        }
      }
    }
  }

  async whenReady() {
    return this._readMapPromise;
  }

  loadMapsOnInit() {
    this._readMapPromise = this.readMaps();
  }

  async readMapFromDir(dir: string) {
    const mapFile = join(dir, MapLoader.MetaFile);
    if (!existsSync(mapFile)) {
      return null;
    }
    const mapData = await readFile(mapFile);
    const map = JSON.parse(mapData.toString()) as GameMap;
    if (!this.validateMapInfo(map)) {
      return null;
    }

    map.cover = join(dir, map.cover);
    map.satellites = map.satellites.map(s => {
      s.image = join(dir, s.image);
      return s;
    });
    return map;
  }

  public validateMapInfo(data: object) {
    // TODO: check everything
    const valid = this.validator(data);
    if (valid) {
      return data;
    }
    console.log(this.validator.errors);
    return null;
  }

  public validateMapName(data: Partial<GameMap>) {
    if (typeof data.name !== 'object') {
      return false;
    }

    if (typeof data.name.zh !== 'string' || typeof data.name.en !== 'string') {
      return false;
    }
    return true;
  }
}
