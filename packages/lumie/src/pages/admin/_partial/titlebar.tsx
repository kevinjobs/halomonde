import React from 'react';
import styled from 'styled-components';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { LoginForm } from '@/apis/auth';
import { getLocalStorage } from '..';
import { fetchUser } from '@/apis/user';
import { IUser } from '@/types';
import COLOR_MAP from '@/styles/colors';

const Nav = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px 0 0;
  .logo {
    padding-left: 48px;
    display: flex;
    align-items: center;
    .version {
      position: relative;
      top: 4px;
      margin-left: 16px;
      color: ${COLOR_MAP.white7};
    }
  }
  .container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .user-status {
      .user {
        display: flex;
        align-items: center;
        margin-left: 32px;
        .name {
          margin: 0 8px;
        }
        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 7px;
          img {
            width: 100%;
            height: 100%;
            border-radius: inherit;
          }
        }
      }
    }
  }
`;

const DialogContent = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  label {
    width: 50px;
    text-align: right;
  }
`;

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
  onSubmit: (e: React.MouseEvent<HTMLElement>, form: LoginForm) => void,
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
  const handleSubmit = (e: React.MouseEvent<HTMLElement>, form: LoginForm) => {
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

  /**
   * 渲染登录按钮
   * @returns {null} 没有返回值
   */
  const renderLogin = () => (
    <Button className="login" type="primary" onClick={onLogin}>登录</Button>
  );

  /**
   * 渲染用户信息
   * @returns {null} 没有返回值
   */
  const renderUser = () => (
    <div className="user">
      <div className="avatar">
        <img src={user?.avatar} alt={user?.username} />
      </div>
      <div className="name">{getLocalStorage().name}</div>
      <div className="level"></div>
      <div className="logout">
        <Button onClick={handleLogout} type="light">登出</Button>
      </div>
    </div>
  );

  React.useEffect(() => {
    (async() => {
      const resp = await fetchUser(getLocalStorage().name);
      if (typeof resp !== 'string') {
        setUser(resp.data.users[0]);
      }
    })();
  }, [username]);

  return (
    <Nav className="admin-navbar">
      <div className="logo">
        <span><h2>后台管理系统</h2></span>
        <span className="version">v2.0.0-20231027</span>
      </div>
      <div className="container">
        <div className="search">
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <div className="user-status">
          { isLogin ? renderUser() : renderLogin() }
        </div>
      </div>
      <Dialog
        title="登录界面"
        visible={visible}
        onCancel={onCancel}
        animation="slide-top-down"
        width={400}
        height={400}
      >
        <DialogContent>
          <div style={{width: 250}}>
            <form>
              <Input label="账号" value={username} name="username" onChange={e => setUsername(e.target.value)} />
              <Input
                type="password"
                label="密码"
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
        </DialogContent>
      </Dialog>
    </Nav>
  );
}