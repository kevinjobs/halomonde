import path from 'path';
import { app, BrowserWindow, App as ElectronApp } from "electron";
import { MAIN_PAGE, MAIN_PORT } from './constant';

type Middleware = (win: BrowserWindow) => Promise<any>;

class App {
  isDev = process.env["NODE_ENV"] === "development";
  win: BrowserWindow = null;
  middles: Middleware[] = [];

  constructor(private electronApp: ElectronApp) {
    this.electronApp.whenReady().then(() => {
      // create main window
      this.win = this.createMainWindow();
      this.listen();

      this.middles.forEach((mid) => {
        mid(this.win).then().catch(console.error);
      })
    });
  }

  listen() {
    // only in macOS
    this.electronApp.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.win = this.createMainWindow();
      }
    });

    this.electronApp.on("window-all-closed", () => {
      // even if you close all windows,
      // the app will not quit in macOS.
      if (process.platform !== "darwin") {
        this.electronApp.quit();
      }
    });
  }

  use(middle: Middleware) {
    this.middles.push(middle);
  }

  /**
   * create electron window
   * @returns electron BrowserWindow
   */
  createMainWindow() {
    const w = new BrowserWindow({
      width: 1000,
      height: 600,
      // resizable: true,
      movable: true,
      frame: false,
      // transparent: true,
      webPreferences: {
        // import and export the ipc method in preload process.
        preload: path.resolve(__dirname, "preload.js"),
        // set below three items to true to make more safe.
        // when you set them true,
        // you cannot use electron in renderer process.
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
      },
    });

    if (this.isDev) {
      w.loadURL(`http://localhost:${MAIN_PORT}/`).then().catch(console.error);
      // open the chrome dev tools when in development mode.
      w.webContents.openDevTools();
    } else {
      // 生产环境应使用相对地址
      // 打包后的根目录为 app/
      w.loadFile(MAIN_PAGE).then().catch(console.error);
    }

    w.on("closed", () => {
      w.destroy();
    })

    return w;
  }
}

export const myapp = new App(app);
