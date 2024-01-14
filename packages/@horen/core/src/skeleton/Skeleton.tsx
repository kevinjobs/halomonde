import React from 'react';
import style from './Skeleton.module.less';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
}

export function Skeleton({width='100%', height=16}:SkeletonProps) {
  return (
    <div className={style.skeleton} style={{width, height}}>
    </div>
  );
}