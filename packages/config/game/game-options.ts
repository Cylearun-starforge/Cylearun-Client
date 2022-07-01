type GameOptionDefine<Value> = {
  value: Value;
  disabled: boolean;
};

export const GameFpsSettings = {
  30: '正常',
  60: '快',
};

export type GameFps = keyof typeof GameFpsSettings;

export const GameTimeSettings = {
  '10:00': '默认',
};

export type GameTime = keyof typeof GameTimeSettings;

export const GameFundOptions = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000] as const;
export type GameFund = typeof GameFundOptions[number];

export interface GameOptions {
  crate: GameOptionDefine<boolean>;
  fastGame: GameOptionDefine<boolean>;
  radar: GameOptionDefine<boolean>;
  allyInGame: GameOptionDefine<boolean>;
  buildOnAlly: GameOptionDefine<boolean>;
  autoRepair: GameOptionDefine<boolean>;
  multiEngineer: GameOptionDefine<boolean>;
  warFog: GameOptionDefine<boolean>;
  hideLocation: GameOptionDefine<boolean>;
  dayNight: GameOptionDefine<boolean>;
  fund: GameOptionDefine<GameFund>;
  unit: GameOptionDefine<number>;
  fps: GameOptionDefine<GameFps>;
  time: GameOptionDefine<GameTime>;
  extremeWeather: GameOptionDefine<boolean>;
}

export const GameOptionLabels: Record<keyof GameOptions, string> = {
  crate: '随机工具箱',
  fastGame: '快速游戏',
  radar: '永久小地图',
  allyInGame: '允许游戏内结盟',
  buildOnAlly: '允许盟友基地旁建设',
  autoRepair: '自动维修',
  multiEngineer: '多位工程师',
  warFog: '可恢复战争迷雾',
  hideLocation: '隐藏载入初始位置',
  dayNight: '启用昼夜更替',
  fund: '初始资金',
  unit: '初始单位数',
  fps: '游戏速度',
  time: '战场时间',
  extremeWeather: '极端天气',
};

export const GameModes = ['标准对战[传统]'] as const;

export type GameMode = typeof GameModes[number];

class StandardGameOptions implements GameOptions {
  crate = {
    value: false,
    disabled: false,
  };
  fastGame = {
    value: true,
    disabled: false,
  };
  radar = {
    value: false,
    disabled: false,
  };
  allyInGame = {
    value: true,
    disabled: true,
  };
  buildOnAlly = {
    value: true,
    disabled: true,
  };
  autoRepair = {
    value: false,
    disabled: false,
  };
  multiEngineer = {
    value: false,
    disabled: false,
  };
  warFog = {
    value: false,
    disabled: false,
  };
  hideLocation = {
    value: false,
    disabled: false,
  };
  dayNight = {
    value: false,
    disabled: false,
  };
  fund: GameOptionDefine<GameFund> = {
    value: 10000,
    disabled: false,
  };
  unit = {
    value: 0,
    disabled: false,
  };
  fps: GameOptionDefine<GameFps> = {
    value: 30,
    disabled: false,
  };
  time: GameOptionDefine<GameTime> = {
    value: '10:00',
    disabled: false,
  };
  extremeWeather = {
    value: false,
    disabled: false,
  };
}

export const GameOptionConstructor: Record<GameMode, { new (): GameOptions }> = {
  '标准对战[传统]': StandardGameOptions,
};
