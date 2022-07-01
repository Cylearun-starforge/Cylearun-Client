export type HumanPlayer = {
  username: string;
  level: string;
  avatar: string;
  avatarBox: string;
  card: string;
  group?: string;
  title?: string;
};

export const BotDifficulties = {
  easy: '简单的敌人',
  medium: '中等的敌人',
  hard: '冷酷的敌人',
} as const;

type BotPlayerDifficulty = keyof typeof BotDifficulties;

export type BotPlayer = {
  difficulty: BotPlayerDifficulty;
  style: string;
};

export const BotStyles = {
  random: '随机战斗风格',
} as const;

export type PlayerInfo = HumanPlayer | BotPlayer;
export type PlayerTeam = 'A' | 'B' | 'C' | 'D';
export type PlayerLocation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type PlayerSide = {
  zh: string;
  en: string;
};

type GenericPlayer<PlayerType> = PlayerType & {
  team: PlayerTeam;
  location: PlayerLocation;
  color: string;
  side: PlayerSide;
};

export type Player =
  | {
      type: 'human';
      info: GenericPlayer<HumanPlayer>;
    }
  | {
      type: 'bot';
      info: GenericPlayer<BotPlayer>;
    }
  | {
      type: 'empty';
      info: {
        side: {
          zh: '随机';
          en: 'RANDOM';
        };
      };
    };
