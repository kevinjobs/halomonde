import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Icon } from '@horen/core';
import Home from './home';
import Cover from './cover';
import Posts from './posts';
import {
  Titlebar,
  TitlebarProps,
  LeftMenu,
  SubMenuProps,
  Redirect,
  Layout,
  LayoutProps
} from './_components';
import style from './index.module.less';

type PageProps = {
  title: string;
  description: string;
  element: React.ReactNode;
  items?: PageProps[];
} & Omit<SubMenuProps, 'children'>;

const LEFT_ITEMS: PageProps[] = [
  {
    title: '后台首页',
    description: '展示所有页面',
    element: <Home />,
    to: 'home',
    arrow: false,
  },
  {
    title: '内容管理',
    description: '主要内容管理',
    element: <Home />,
    isOpen: true,
    items: [
      {
        title: '所有内容',
        description: '管理所有内容',
        element: <Posts />,
        to: 'content/posts'
      },
      {
        title: '封面管理',
        description: '管理相册封面',
        element: <Cover />,
        to: 'content/cover'
      },
    ]
  },
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