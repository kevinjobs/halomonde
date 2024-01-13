import React, { ReactElement, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  BlocksAndArrows,
  CollectPicture,
  Config,
  MindmapList,
  User,
  Camp,
  Key,
  Home,
  FileSearch
} from '@icon-park/react';

import { login, LoginForm } from '@/apis/auth';
import TitleBar from '../_partial/titlebar';
import LeftMenu, { SubMenuProps } from '../_partial/menu';
import { getLocalStorage, setLocalStorage, clearLocalStorage} from '@/utils'

const ITEMS: Omit<SubMenuProps, 'children'>[] = [
  {
    title: '后台首页',
    isOpen: false,
    arrow: false,
    icon: <Home theme="outline" size="20" fill="#333" strokeWidth={2}/>,
    to: '/admin/home',
  },
  {
    title: '内容管理',
    isOpen: true,
    icon: <BlocksAndArrows theme="outline" size="20" fill="#333" strokeWidth={2}/>,
    items: [
      {
        title: '所有内容',
        to: '/admin/post',
        icon: <MindmapList theme="outline" size="16" fill="#4a4a4a"/>,
      },
      {
        title: '画册封面',
        to: '/admin/cover',
        icon: <CollectPicture theme="outline" size="16" fill="#4a4a4a"/>,
      },
      {
        title: '封面诗文',
        to: '/admin/verse',
        icon: <Camp theme="outline" size="16" fill="#4a4a4a"/>,
      },
    ]
  },
  {
    title: '系统管理',
    isOpen: true,
    icon: <Config theme="outline" size="20" fill="#333" strokeWidth={2}/>,
    items: [
      {
        title: '用户管理',
        to: '/admin/user',
        icon: <User theme="outline" size="16" fill="#4a4a4a"/>,
      },
      {
        title: '邀请码',
        to: '/admin/invitations',
        icon: <Key theme="outline" size="16" fill="#4a4a4a"/>,
      },
      {
        title: '文件列表',
        to: '/admin/files',
        icon: <FileSearch theme="outline" size="16" fill="#4a4a4a"/>,
      }
    ]
  }
]

const Admin = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  .main-container {
    width: 100vw;
    display: flex;
    .admin-content {
      background-color: #ffffff;
      margin: 10px 0 0 10px;
      padding: 16px 32px;
      height: calc(100vh - 70px);
      overflow-y: scroll;
      flex-grow: 1;
    }
  }
`;

export default function DesktopPage () :ReactElement {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isLoginDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>, form: LoginForm) => {
    (async() => {
      const data = await login(form);
      if (typeof data !== 'string') {
        setLocalStorage(data.data.token, form.username);
        setIsDialogVisible(false);
        setIsLogin(true);
        history.go(0);
      } else {
        window.alert('登录失败');
      }
    })();
  };

  /**
   * 处理点击右上角【登录】按钮事件
   * @param event 鼠标事件
   */
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDialogVisible(true);
  };

  /**
   * 处理点击右上角【登出】按钮事件
   * @param event 鼠标事件
   */
  const handleLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsLogin(false);
    clearLocalStorage();
    history.go(0);
  };

  /**
   * 处理点击登录框【取消】&右上角【x】事件，
   * @param event 鼠标事件
   */
  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDialogVisible(false);
  };

  /**
   * 组件挂载时，判断是否登录
   */
  React.useEffect(() => {
    const { token, name } = getLocalStorage();
    if (token && name) setIsLogin(true);
  }, []);

  return (
    <Admin className="admin">
      <TitleBar
        isLogin={isLogin}
        isLoginDialogVisible={isLoginDialogVisible}
        onSubmit={(e, form) => handleSubmit(e, form)}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onCancel={handleCancel}
      />
      <div className="main-container">
        <div className='menu-content'>
          <LeftMenu items={ITEMS} />
        </div>
        <div className="admin-content">
          <Routes>
            
          </Routes>
        </div>
      </div>
    </Admin>
  );
}

export function Redirect({to}: {to: string}) :null {
  const navigate = useNavigate();
  useEffect(() => navigate(to), []);
  return null;
}
