import { GameMap } from 'config/game/game-map';
import { WebContents } from 'electron';
export type IpcEventToRenderer = {
  'map-load-single': [GameMap];
};

export function composeSender(sender: WebContents['send']) {
  return function send<Channel extends keyof IpcEventToRenderer, Args extends IpcEventToRenderer[Channel]>(
    channel: Channel,
    ...args: Args
  ) {
    sender(channel, ...args);
  };
}
