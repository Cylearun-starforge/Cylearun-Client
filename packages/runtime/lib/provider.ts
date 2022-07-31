import { ClientIpcInvokes } from './ipc-invokes';
import { MainProcessEmittable } from './ipc-events';
import { IpcMainInvokeEvent } from 'electron';

type InvokeHandler<Channel extends keyof ClientIpcInvokes> = ClientIpcInvokes[Channel] extends (
  ...args: infer Args
) => infer Return
  ? (event: IpcMainInvokeEvent, ...args: [...Args]) => Return
  : never;

export interface IRuntimeProvider {
  invokeHandlers: {
    [Channel in keyof ClientIpcInvokes]: InvokeHandler<Channel>;
  };
  emits: MainProcessEmittable;
}
