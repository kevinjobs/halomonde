import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Icon } from '@horen/core';

import Home from './home';
import Cover from './posts/cover';
import Everything from './posts/everything';
import Verse from './posts/verse';
import User from './system/user';
import Invitaition from './system/invitation';

import {
  Titlebar,
  TitlebarProps,
  LeftMenu,
  SubMenuProps,
  Layout,
} from './_components';

import style from './index.module.less';

interface PageProps extends Omit<SubMenuProps, 'children'> {
  title: string;
  description: string;
  element: React.ReactNode;
  items?: PageProps[];
};

const LEFT_ITEMS: PageProps[] = [
  {
    title: '后台首页',
    description: '展示所有页面',
    element: <Home />,
    to: 'home',
    arrow: false,
    icon: <Icon name="home" />
  },
  {
    title: '内容管理',
    description: '主要内容管理',
    element: <></>,
    expand: true,
    icon: <Icon name='menu' />,
    items: [
      {
        title: '所有内容浏览',
        description: '管理所有内容',
        element: <Everything />,
        to: 'content/posts',
        icon: <Icon name='files' />,
      },
      {
        title: '封面管理',
        description: '管理相册封面',
        element: <Cover />,
        to: 'content/cover',
        icon: <Icon name='picture' />,
      },
      {
        title: '诗句管理',
        description: '管理首页诗句',
        element: <Verse />,
        to: 'content/verse',
        icon: <Icon name='verse' size={27} />,
      }
    ]
  },
  {
    title: '系统管理',
    description: '系统管理',
    element: <></>,
    expand: true,
    icon: <Icon name='menu' />,
    items: [
      {
        title: '用户管理',
        description: '查看、编辑、更新用户',
        element: <User />,
        to: 'system/user',
        icon: <Icon name='verse' size={27} />,
      },
      {
        title: '邀请码管理',
        description: '查看邀请码',
        element: <Invitaition />,
        to: 'system/invitaition',
        icon: <Icon name='verse' size={27} />,
      }
    ]
  }
]

const TITLE_BAR_PROPS: TitlebarProps = {
  logo: <Icon name='dimension' />,
}

export default function Domo() {
  return (
    <div className={style.domo}>
      <div className={style.top}>
        <Titlebar {...TITLE_BAR_PROPS} />
      </div>
      <div className={style.main}>
        <div className={style.left}>
          <LeftMenu items={LEFT_ITEMS} />
        </div>
        <div className={style.right}>
          <Routes>
            {renderPages(LEFT_ITEMS)}
          </Routes>
        </div>
      </div>
    </div>
  )
}

const renderPages = (pages: PageProps[]) => {
  const arr = [];
  for (const page of pages) {
    if (page.to) arr.push(page)
    else if (page.items) {
      for (const item of page.items) {
        if (item.to) {
          arr.push(item);
        }
      }
    }
  }
  return arr.map(page => {
    return (
      <Route
        path={page.to}
        element={<Layout title={page.title} description={page.description}>{page.element}</Layout>}
        key={page.to}
      />
    )
  })
}