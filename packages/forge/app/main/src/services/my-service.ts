import Eipc from "eipc";
import { createSettingWindow } from "./_window";
import { SETTING_PAGE, SETTING_PORT } from "src/constant";
import { myapp } from "src/app";

@Eipc.Injectable("MyService")
export class MyService {
  constructor() {
    // do nothing
  }

  /**
   * 关闭主窗口
   */
  public closeMainWindow() {
    myapp.win.close();
  }

  /**
   * 最小化主窗口
   */
  public minimizeMainWindow() {
    myapp.win.minimize();
  }

  /**
   * 最大化主窗口
   */
  public maximizeMainWindow() {
    if (myapp.win.isMaximized()) {
      myapp.win.unmaximize();
    } else myapp.win.maximize();
  }

  public getDelayTime(): number {
    return 2;
  }

  public openSettingWindow() {
    const isDev = process.env.NODE_ENV === 'development';
    const w = createSettingWindow();

    if (isDev) {
      w.loadURL(`http://localhost:${SETTING_PORT}/`)
        .then()
        .catch(console.error);
    } else {
      // 生产环境应使用相对地址
      // 打包后的根目录为 app/
      w.loadFile(SETTING_PAGE).then().catch(console.error);
    }
  }
}