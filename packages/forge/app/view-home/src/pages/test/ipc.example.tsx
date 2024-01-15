import React from 'react';
import { sendMsg, receiveMsg } from '@api/ipc.api';

export default function IpcExample() {
  const [ipcMsg, setIpcMsg] = React.useState('');

  React.useEffect(() => {
    receiveMsg().then(msg => setIpcMsg(msg)).catch(console.error);
  }, []);

  return (
    <div>
      <div>
        发送信息，两秒后会受到回复
        <button onClick={() => sendMsg('hello, ipc!')}>send</button>
      </div>
      <p><span>receive msg: </span>{ ipcMsg }</p>
    </div>
  )
}