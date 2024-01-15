import CHANNELS from "../channels";
import Eipc from "eipc";
import { MyService } from "../services/my-service";

@Eipc.Handler()
export default class MyHandler {
  constructor(private myService: MyService) {
    // do nothing;
  }

  @Eipc.On(CHANNELS.replyMsg)
  public replyMsg(msg: string) {
    return `${this.myService.getDelayTime()} 毫秒之后回复: ${msg}`;
  }

  @Eipc.Invoke(CHANNELS.sendMsg)
  public async handleSendMsg(msg: string): Promise<string> {
    console.log("get the ", msg);
    setTimeout(() => {
      this.replyMsg(msg);
    }, this.myService.getDelayTime() * 1000);

    return `主进程受到了您的信息: ${msg}`;
  }

  @Eipc.Invoke(CHANNELS.closeMainWindow)
  public async handleCloseMainWin() {
    this.myService.closeMainWindow();
  }
  
  @Eipc.Invoke(CHANNELS.minimizeMainWindow)
  public async handleMinimizeMainWin() {
    this.myService.minimizeMainWindow();
  }

  @Eipc.Invoke(CHANNELS.maximizeMainWindow)
  public async handleMaximizeMainWin() {
    this.myService.maximizeMainWindow();
  }

  @Eipc.Invoke(CHANNELS.openNewWindow)
  public async handleOpenNewWindow(msg: string): Promise<boolean> {
    if (msg === 'setting') {
      this.myService.openSettingWindow();
      return true;
    }
    
    if (msg === 'mini-player') {
      return true;
    }
  }
}