import React from 'react';

export interface IBase {
  id?: number,
  uid?: string,
}

export type IPost = Partial<{
  //
  createAt: number;
  publishAt: number;
  updateAt: number;
  type: string;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  // cover: string;
  status: string;
  tags: string;
  category: string;
  format: string;
  url: string;
  exif: string;
  description: string;
}> & IBase;

export interface IExif {
  width?: number;
  height?: number;
}

export interface IUser extends IBase {
  username: string,
  password?: string,
  nickname?: string;
  birthday?: number;
  gender?: string;
  location?: string;
  role?: string;
  group?: string;
  avatar?: string;
  motto?: string;
  description?: string;
  invitation?: string;
}

export interface IComment extends IPost {}

export interface IRouteItem {
  key: number,
  icon?: React.ReactNode,
  paths: Array<string>,
  name: string,
  title: string,
  component: React.ReactNode,
  exact: boolean,
  type: 'history' | 'hash',
  show?: boolean,
}

export interface IColorMap {
  [key: string]: string,
  red: string,
  orange: string,
  yellow: string,
  green: string,
  cyan: string,
  blue: string,
  purple: string,
  primary: string,
  white: string,
  white1: string,
  white2: string,
  white3: string,
  white4: string,
  white5: string,
  white6: string,
  white7: string,
  white8: string;
  dark: string,
}

export interface IVerse {
  createAt: string,
  updateAt: string,
  id: number,
  uid: string,
  title: string,
  author: string,
  content: string[],
}

export type Response<T = undefined> = Promise<{
  code: number;
  msg: string;
  data?: T
} | string>;
