import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Input } from '@horen/core';

import { GetTokenParams } from '@/utils/apis/auth';
import { getUser } from '@/utils/apis/user';
import { IUser } from '@/types';
import { getLocalStorage } from '@/utils/store';
import { Button } from '@horen/core';

import css from './Titlebar.module.less';

export interface NavbarProps {
  /**
   * 是否已经登录
   */
  isLogin: boolean,
  /**
   * 是否显示登录对话框
   */
  isLoginDialogVisible: boolean,
  /**
   * 点击登录 dialog 的【提交】按钮时触发
   */
  onSubmit: (e: React.MouseEvent<HTMLElement>, form: GetTokenParams) => void,
  /**
   * 点击登录 dialog 的【取消】按钮或右上角【X】按钮时触发
   */
  onCancel: React.MouseEventHandler<HTMLElement>,
  /**
   * 点击右上角【登录】按钮时触发
   */
  onLogin: React.MouseEventHandler<HTMLElement>,
  /**
   * 点击右上角【注销】【登出】按钮时触发
   * 仅在已经登录时，显示该按钮
   */
  onLogout: React.MouseEventHandler<HTMLElement>,
}

export default function Navbar (props: NavbarProps) :React.ReactElement {
  const {
    isLogin,
    isLoginDialogVisible: visible,
    onSubmit,
    onCancel,
    onLogin,
    onLogout,
  } = props;
  // states 1. search
  const [searchValue, setSearchValue] = React.useState('');
  // states 2. login - username & password
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [user, setUser] = React.useState<IUser>();

  /**
   * 处理点击【提交】按钮事件
   * @param e 鼠标事件
   * @param form 登录表单
   * @returns {null}
   */
  const handleSubmit = (e: React.MouseEvent<HTMLElement>, form: GetTokenParams) => {
    e.preventDefault();
    onSubmit(e, form);
  };

  /**
   * 处理点击【登出】按钮事件
   * @param e 鼠标事件
   * @returns {null}
   */
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if(window.confirm('确定要登出吗？')) onLogout(e);
  };

  const Login = () => (
    <Button className="login" type="primary" onClick={onLogin}>登录</Button>
  );

  /**
   * 渲染用户信息
   * @returns {null} 没有返回值
   */
  const User = () => (
    <div className={css.user}>
      <div className={css.avatar}>
        <img src={user?.avatar} alt={user?.username} />
      </div>
      <div className={css.name}>{getLocalStorage().name}</div>
      <div className={css.logout}>
        <Button onClick={handleLogout} type="light">登出</Button>
      </div>
    </div>
  );

  React.useEffect(() => {
    (async() => {
      const resp = await getUser(getLocalStorage().name);
      if (typeof resp !== 'string') {
        setUser(resp.data.users[0]);
      }
    })();
  }, [username]);

  return (
    <div className={css.titlebar}>
      <div className={css.logo}>
        <span><h2>后台管理系统</h2></span>
        <span className={css.version}>v0.0.9-20231229</span>
      </div>
      <div className={css.container}>
        <div className={css.search}>
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <div className={css.userAndLogin}>
          { isLogin ? <User /> : <Login /> }
        </div>
      </div>
      <Modal
        title="登录界面"
        visible={visible}
        onClose={onCancel}
      >
        <div className={css.dialogContainer}>
          <div style={{width: 250}}>
            <form>
              <Input
                value={username}
                name="username"
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                type="password"
                value={password}
                name="password"
                onChange={e => setPassword(e.target.value)}
                autoComplete="on"
              />
            </form>
          </div>
          <div style={{width: '100%', textAlign: 'center', marginTop: 24,}}>
            <Button
              type="primary"
              onClick={e => handleSubmit(e, {username: username, password})}>登录</Button>
            <Button onClick={onCancel}>取消</Button>
          </div>
          <div>
            <Link to={'/register'}>没有账户？点击注册...</Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}