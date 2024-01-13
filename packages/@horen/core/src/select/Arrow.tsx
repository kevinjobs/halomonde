import React from "react";
import style from './Arrow.module.less';

export interface ArrowProps {
  up?: boolean;
}

export function Arrow({up = false}: ArrowProps) {
  const angle = up ? -45 : 45;
  return (
    <div className={style.container}>
      <div className={style.arrow1} style={{transform: `rotate(${angle}deg)`}}></div>
      <div className={style.arrow2} style={{transform: `rotate(${-angle}deg)`}}></div>
    </div>
  )
}