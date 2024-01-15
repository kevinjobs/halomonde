export const sendMsg = window?.ipc?.sendMsg || null;
export const receiveMsg = window?.ipc?.receiveMsg || null;
export const openNewWindow = window?.ipc?.openNewWindow || null;
export const closeMainWindow = window?.ipc?.closeMainWindow || null;
export const minimizeMainWindow = window?.ipc?.minimizeMainWindow || null;
export const maximizeMainWindow = window?.ipc?.maximizeMainWindow || null;

declare global {
  interface Window {
    ipc: Ipc;
  }
}

interface Ipc {
  sendMsg?: (msg: string) => Promise<string>;
  receiveMsg?: () => Promise<string>;
  openNewWindow?: (msg: string) => Promise<boolean>;
  closeMainWindow?: () => Promise<void>;
  minimizeMainWindow?: () => Promise<void>;
  maximizeMainWindow?: () => Promise<void>;
}
