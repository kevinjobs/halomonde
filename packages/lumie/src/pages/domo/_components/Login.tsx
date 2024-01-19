import React, { useState } from 'react';

import { clearLoginedUser, setLoginedUser, store } from '@/store';
import { IUser } from '@/types';
import { getToken, getUser } from '@/utils/apis';
import { Button, Icon, Input, Modal } from '@horen/core';
import { notifications } from '@horen/notifications';
import { useStore } from '@horen/store';

import style from './Login.module.less';

export type LoginProps = {
  onSuccess?(user: IUser): void;
  onFalied?(): void;
};

export default function Login(props: LoginProps) {
  const { onSuccess, onFalied } = props;
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const state = useStore(store);

  const refreshUser = (token: string) => {
    getUser(username).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({
          variant: 'danger',
          message: resp,
        });
      } else {
        setLoginedUser({ ...resp.data.users[0], token });
        notifications.show({
          variant: 'success',
          message: '登录成功',
        });
      }
    });
  };

  const handleLogin = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    getToken({ username, password }).then((resp) => {
      if (typeof resp === 'string') {
        notifications.show({ variant: 'danger', message: resp });
      } else {
        const token = resp.data.token;
        notifications.show({ variant: 'success', message: resp.msg });
        setLoginedUser({ token });
        setVisible(false);
        refreshUser(token);
      }
    });
  };

  return (
    <div className={style.login}>
      {state.user ? (
        <LoginedInfo user={state.user} />
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
      <Modal visible={visible} onClose={handleClose}>
        <Modal.Header>
          <h3>登录界面</h3>
        </Modal.Header>
        <Modal.Content>
          <div className={style.item}>
            <label>账号</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={style.item}>
            <label>密码</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.submitArea}>
            <Button onClick={handleSubmit}>登录</Button>
            <Button variant="danger" onClick={handleClose}>
              取消
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const LoginedInfo = ({ user }: { user: IUser }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    if (window.confirm('确定退出登录？')) {
      clearLoginedUser();
    }
  };

  return (
    <div className={style.loginedInfo}>
      <div className={style.avatar} onClick={handleClick}>
        <img src={user.avatar} alt="avatar" />
      </div>
      <div
        className={style.infoPanel}
        style={{ display: visible ? 'block' : 'none' }}>
        <div className={style.name}>
          <span>
            <Icon name="user" fill="#f1f1f1" size={20} />
          </span>
          <span>{user.username}</span>
        </div>
        <div className={style.role}>
          <span>
            <Icon name="vip" fill="#f1f1f1" size={20} />
          </span>
          <span>{user.role}</span>
        </div>
        <div className={style.logout} onClick={handleLogout}>
          <span>
            <Icon name="logout" fill="#f1f1f1" size={20} />
          </span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};
