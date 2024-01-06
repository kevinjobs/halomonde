import React from 'react';
import { HorenStore, createStore, useStore } from '@horen/store';

export interface LetopItem {
  /** 信息 id */
  id?: string;

  /** 信息标题 可为空 */
  title?: string;

  /** 信息主文 不可以为空 */
  message?: React.ReactNode;

  /** 打开时的回调 */
  onOpen?(notice: LetopItem): void;

  /** 关闭时的回调 */
  onClose?(notice: LetopItem): void;
}

export interface LpState {
  /** 信息池 */
  lp: LetopItem[],

  /** 等待队列 */
  queue: LetopItem[];

  /** 当前最多显示限制 超过的一般应做隐藏处理 */
  limit: number;
}

/** 信息池 */
export type Lpool = HorenStore<LpState>;

/**
 * 创建一个信息池
 * @returns 信息池
 */
export function createLpStore(): Lpool {
  return createStore<LpState>({
    lp: [],
    queue: [],
    limit: 5,
  });
}

// 创建默认的 store
export const lpStore = createLpStore();

// use
export function useLp (store = lpStore) {
  return useStore(store);
}

// 更新
export function updateLpState(
  store: Lpool,
  update: (lp: LetopItem[]) => LetopItem[]
) {
  const state = store.getState();
  const nofns = update([...state.lp, ...state.queue]);

  store.setState({
    lp: nofns.slice(0, state.limit),
    queue: nofns.slice(state.limit),
    limit: state.limit,
  })
}

// 显示一条
export function showLetop(
  letop: LetopItem,
  store: Lpool = lpStore
) {
  const id = letop.id || String((new Date()).valueOf());
  updateLpState(store, (lp) => {
    if (letop.id && lp.some((n) => n.id === letop.id)) {
      return lp;
    }

    return [...lp, { ...letop, id }];
  });

  return id;
}


// 隐藏，根据 id
export function hideLetop(id: string, store: Lpool = lpStore) {
  updateLpState(store, (lp) => lp.filter((letop) => {
    if (letop.id === id) {
      letop.onClose?.(letop);
      return false;
    }

    return true;
  }))

  return id;
}

/**
 * 更新一条消息
 * @param letop 消息
 * @param store 消息池
 * @returns 消息的 id
 */
export function updateLetop(letop: LetopItem, store = lpStore) {
  updateLpState(store, lp => 
    lp.map(item => {
      if (item.id === letop.id) {
        return { ...item, ...letop };
      }

      return item;
    })
  );

  return letop.id;
}

/**
 * 清空信息池
 * @param store 消息池
 */
export function cleanLp(store = lpStore) {
  updateLpState(store, () => []);
}

/**
 * 清空等待队列
 * @param store 消息池
 */
export function cleanLpQueue(store = lpStore) {
  updateLpState(store, lp => lp.slice(0, store.getState().limit));
}

export const notifications = {
  show: showLetop,
  hide: hideLetop,
  update: updateLetop,
  clean: cleanLp,
  cleanQueue: cleanLpQueue,
  updateState: updateLpState,
} as const;
