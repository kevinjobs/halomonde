import React from 'react';

import css from './Tag.module.less';

export interface TagProps {
  theme?: string;
  color?: string;
  children?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
}

export function Tag({theme, color, children, rounded=false}: TagProps) {
  const styles: React.CSSProperties = {
    borderRadius: rounded ? 3 : 0,
  }

  if (color) styles.backgroundColor = color;

  return (
    <span className={css.tag} style={styles}>{children}</span>
  )
}