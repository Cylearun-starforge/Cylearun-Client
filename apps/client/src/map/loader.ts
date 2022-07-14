import { join } from 'path';
import { Application } from '../application';
import { GameMap } from 'config/game/game-map';
import { opendir, readFile } from 'fs/promises';
import { existsSync } from 'fs';

export class MapLoader {
  public static Constants = {
    MapDir: 'maps/',
  } as const;

  public loadedMaps: GameMap[] = [];

  private _baseDir: string;
  private _readMapPromise: Promise<void> = new Promise(() => {
    // We never call resolve, so this promise is always pending
  });

  constructor() {
    this._baseDir = __BASE_REDIRECT__ ?? join(Application.raw.getAppPath(), '..');
  }

  get mapDir() {
    return join(this._baseDir, MapLoader.Constants.MapDir);
  }

  async readMaps() {
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
    const mapFile = join(dir, 'map.json');
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
    return this.validateMapName(data);
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
