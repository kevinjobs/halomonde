/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { animated, useSpring } from 'react-spring';

import { PhotoInfoPanel } from '@/pages/view/photo';
import { IPost } from '@/types';

import style from './Item.module.less';

export interface ItemProps {
  originWidth: number;
  originHeight: number;
  title: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  index: number;
  finalWidth: number;
  finalHeight: number;
  finalTop: number;
  finalLeft: number;
  children?: React.ReactNode;
  post?: IPost;
}

export const MasonryItem = (props: ItemProps) => {
  const {
    width,
    height,
    top,
    left,
    finalLeft,
    finalHeight,
    finalWidth,
    finalTop,
    children,
    post,
  } = props;

  const [picked, setPicked] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const outRef = React.useRef<HTMLDivElement>();

  const [styles, api] = useSpring(
    () => ({
      left: 0,
      top: 0,
      width,
      height,
      position: 'absolute',
      zIndex: 1,
      visibility: 'hidden',
    }),
    [],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = outRef?.current?.getBoundingClientRect();

    if (!picked) {
      api.start({
        from: {
          position: 'fixed',
          width: width,
          height: height,
          left: rect.left,
          top: rect.top,
          zIndex: 999,
          visibility: 'visible',
        },
        to: {
          position: 'fixed',
          width: finalWidth,
          height: finalHeight,
          left: finalLeft,
          top: finalTop,
          zIndex: 999,
          visibility: 'visible',
        },
        config: { mass: 0.5, tension: 270, friction: 16 },
      });
      setPicked(true);
    } else {
      setPicked(false);
      api.start({
        from: {
          position: 'fixed',
          width: finalWidth,
          height: finalHeight,
          left: finalLeft,
          top: finalTop,
          zIndex: 999,
          visibility: 'visible',
        },
        to: {
          position: 'fixed',
          width: width,
          height: height,
          left: rect.left,
          top: rect.top,
          zIndex: 1,
          visibility: 'visible',
        },
        config: { mass: 0.8, tension: 280, friction: 26 },
      });
      setTimeout(() => {
        api.set({
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1,
          visibility: 'hidden',
        });
      }, 250);
    }
  };

  return (
    <div
      key={props.title}
      ref={outRef}
      onClick={handleClick}
      className={style.masnoryItem}
      style={{ width, height, top, left }}>
      <div>
        <img src={props.src} alt={props.title} />
      </div>
      <animated.div style={{ ...(styles as any) }}>
        <img src={props.src} alt={props.title} />
      </animated.div>
      <div className={style.info} style={{ width, height }}>
        <div className={style.title}>
          <span>{post?.title}</span>
        </div>
        <div className={style.content}>
          <span>{post?.content || post?.excerpt}</span>
        </div>
      </div>
      {children}
      {picked && (
        <PhotoInfoPanel
          alwaysShow={true}
          post={post}
          infoVisible={visible}
          onClickView={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setVisible(!visible);
          }}
        />
      )}
      {picked && <div className={style.mask}></div>}
    </div>
  );
};
