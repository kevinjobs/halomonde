import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { store } from '@/store';
import { Icon } from '@horen/core';
import { useStore } from '@horen/store';

import {
  BanPage,
  Layout,
  LeftMenu,
  Login,
  SubMenuProps,
  Titlebar,
  TitlebarProps,
} from './_components';
import Home from './home';
import style from './index.module.less';

import {
  AddArticlePage,
  AddPhotoPage,
  AddVersePage,
  AddCoverPage,
  ContentHomePage,
} from '@/pages/domo/content';

import Invitaition from './system/invitation';
import User from './system/user';

interface PageProps extends Omit<SubMenuProps, 'children'> {
  title: string;
  description: string;
  element: React.ReactNode;
  items?: PageProps[];
  loginRequired?: boolean;
  allowLevels?: string[];
}

const LEFT_ITEMS: PageProps[] = [
  {
    title: '后台首页',
    description: '展示所有页面',
    element: <Home />,
    to: 'home',
    arrow: false,
    icon: <Icon name="home" />,
  },
  {
    title: '内容管理',
    description: '主要内容管理',
    element: <></>,
    expand: true,
    icon: <Icon name="menu" />,
    items: [
      {
        title: '所有内容浏览',
        description: '管理所有内容',
        element: <ContentHomePage />,
        to: 'content/posts',
        icon: <Icon name="files" />,
      },
      {
        title: '添加图片',
        description: '将照片上传到图库',
        element: <AddPhotoPage />,
        to: 'content/add-image',
        icon: <Icon name="camera" />,
        loginRequired: true,
      },
      {
        title: '上传封面',
        description: '将图片上传到封面库',
        element: <AddCoverPage />,
        to: 'content/add-cover',
        icon: <Icon name="picture" />,
        loginRequired: true,
        allowLevels: ['admin', 'superuser'],
      },
      {
        title: '新增文章',
        description: '将文章上传到文章库',
        element: <AddArticlePage />,
        to: 'content/add-article',
        icon: <Icon name="verse" />,
        loginRequired: true,
        allowLevels: ['admin', 'superuser'],
      },
      {
        title: '添加诗文',
        description: '将Verse上传',
        element: <AddVersePage />,
        to: 'content/add-verse',
        icon: <Icon name="verse" />,
        loginRequired: true,
        allowLevels: ['admin', 'superuser'],
      },
    ],
  },
  {
    title: '系统管理',
    description: '系统管理',
    element: <></>,
    expand: true,
    icon: <Icon name="menu" />,
    items: [
      {
        title: '用户管理',
        description: '查看、编辑、更新用户',
        element: <User />,
        to: 'system/user',
        icon: <Icon name="verse" size={27} />,
        loginRequired: true,
        allowLevels: ['admin', 'superuser'],
      },
      {
        title: '邀请码管理',
        description: '查看邀请码',
        element: <Invitaition />,
        to: 'system/invitaition',
        icon: <Icon name="verse" size={27} />,
        loginRequired: true,
        allowLevels: ['superuser'],
      },
    ],
  },
];

const TITLE_BAR_PROPS: TitlebarProps = {
  logo: <Icon name="dimension" />,
};

export default function Domo() {
  return (
    <div className={style.domo}>
      <div className={style.top}>
        <Titlebar {...TITLE_BAR_PROPS}>
          <div className={style.loginArea}>
            <Login />
          </div>
        </Titlebar>
      </div>
      <div className={style.main}>
        <div className={style.left}>
          <LeftMenu items={LEFT_ITEMS} />
        </div>
        <div className={style.right}>
          <Routes>{renderPages(LEFT_ITEMS)}</Routes>
        </div>
      </div>
    </div>
  );
}

const renderPages = (pages: PageProps[]) => {
  const state = useStore(store);
  const isLogined = state?.user;

  const arr = [];
  for (const page of pages) {
    if (page.to) arr.push(page);
    else if (page.items) {
      for (const item of page.items) {
        if (item.to) {
          if (item.loginRequired) {
            if (isLogined) {
              const allowLevels = item.allowLevels || [
                'common',
                'admin',
                'superuser',
              ];
              if (allowLevels.includes(state.user.role)) {
                arr.push(item);
              } else {
                arr.push({
                  ...item,
                  element: (
                    <BanPage
                      currentRole={state.user.role}
                      allowRole={allowLevels.join(',')}
                    />
                  ),
                });
              }
            } else {
              arr.push({
                ...item,
                element: <BanPage message="请登录后访问" />,
              });
            }
          } else {
            arr.push(item);
          }
        }
      }
    }
  }
  return arr.map((page) => {
    return (
      <Route
        path={page.to}
        element={
          <Layout title={page.title} description={page.description}>
            {page.element}
          </Layout>
        }
        key={page.to}
      />
    );
  });
};
