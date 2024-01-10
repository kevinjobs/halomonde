import React from "react";
import style from './Layout.module.less';

export type LayoutProps = {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}

export default function Layout({title, description, children}: LayoutProps) {
  return (
    <div className={style.layout}>
      <div className={style.title}>
        { title }
      </div>
      <div className={style.description}>
        { description }
      </div>
      <div className={style.children}>
        { children }
      </div>
    </div>
  )
}