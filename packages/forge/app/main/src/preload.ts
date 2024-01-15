import { contextBridge, ipcRenderer } from 'electron';
import CHANNELS from './channels';

export type IPC = {
  sendMsg(msg: string): Promise<string>;
  receiveMsg(): Promise<string>;
  openNewWindow(msg: string): Promise<boolean>;
  closeMainWindow(): Promise<void>;
  minimizeMainWindow(): Promise<void>;
  maximizeMainWindow(): Promise<void>;
}

declare global {
  interface Window {
    ipc: IPC;
  }
}

const IPC_API: IPC = {
  sendMsg,
  receiveMsg,
  openNewWindow,
  closeMainWindow,
  minimizeMainWindow,
  maximizeMainWindow,
}

contextBridge.exposeInMainWorld("ipc", IPC_API);

// ipc handles
async function sendMsg(msg: string) {
  return await ipcRenderer.invoke(CHANNELS.sendMsg, msg);
}

async function receiveMsg():Promise<string> {
  return new Promise((res, rej) => {
    ipcRenderer.on(CHANNELS.replyMsg, (evt, msg: string) => {
      res(msg);
    })
  })
}

async function openNewWindow(msg:string) {
  return await ipcRenderer.invoke(CHANNELS.openNewWindow, msg);
}

async function closeMainWindow() {
  return await ipcRenderer.invoke(CHANNELS.closeMainWindow);
}

async function minimizeMainWindow() {
  return await ipcRenderer.invoke(CHANNELS.minimizeMainWindow);
}

async function maximizeMainWindow() {
  return await ipcRenderer.invoke(CHANNELS.maximizeMainWindow);
}