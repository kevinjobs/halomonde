import React from 'react';
import style from './_layout.module.css';

export interface ComponentPageProps {
  children: React.ReactNode;
}

export interface DescProps {
  title: string;
  description: string;
  usage: string;
}

export interface PlaygroundProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

export interface GroupProps {
  children: React.ReactNode;
}

export function ComponentPage({children}: ComponentPageProps) {
  return (
    <div className={style.componentPage}>
      { children }
    </div>
  )
}

export function Desc({title, description, usage}: DescProps) {
  return (
    <div className={style.componentDesc}>
      <h1>{title}</h1>
      <div className={style.componentSubtitle}>
        <span>Description</span>
        <span>{description}</span>
      </div>
      <div className={style.componentUsage}>
        <span>Usage</span>
        <code>
        { usage }
        </code>
      </div>
    </div>
  )
}

export function Playground({children,width='auto',height='100%'}: PlaygroundProps) {
  return (
    <div className={style.playground} style={{width, height}}>
      { children }
    </div>
  )
}

export function Group({children}: GroupProps) {
  return (
    <div className={style.playgroundGroup}>{children}</div>
  )
}