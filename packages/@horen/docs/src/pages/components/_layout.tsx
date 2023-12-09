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

export function ComponentPage({children}: ComponentPageProps) {
  return (
    <div className={style.componentPage}>
      { children }
    </div>
  )
}

export function Desc({title, description, usage}: DescProps) {
  return (
    <div className='component-desc'>
      <h1>{title}</h1>
      <h4>{description}</h4>
      <div className='component-desc__usage'>
        { usage }
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