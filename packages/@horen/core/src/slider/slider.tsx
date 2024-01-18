import React, { useEffect, useRef, useState } from 'react';
import cls from './Slider.module.less';

import { MovePosition, useMove, useDidUpdate } from '@horen/hooks';
import { BaseVariant } from '../_types';
import themes from '../themes.module.less';
import { classnames } from '../_utils';

export interface SliderProps {
  /**
   * 滑动条值改变时的回调函数
   *
   * param: percent 范围为 0.01 ~ 1.00
   *
   * param: value 实际长度或宽度
   */
  onChange?(percent: number, value: number): void;
  /**
   * 滑动条停止滚动时的回调函数
   *
   * @param percent 范围为 0.01 ~ 1.00
   *
   * @param value 实际长度或宽度
   */
  onChangeEnd?(percent: number, value: number): void;
  /**
   * 滑动条的高度或宽度，默认为 8，单位为 px
   */
  size?: number;
  /**
   * 默认高度或宽度百分比，范围为 0.01 ~ 1.00，默认为 0
   */
  defaultValue?: number;
  /**
   * 主题色
   */
  variant?: BaseVariant;
}

export function Slider(props: SliderProps) {
  const {
    onChange,
    onChangeEnd,
    size = 8,
    defaultValue = 0,
    variant = 'primary',
  } = props;

  const [fullWidth, setFullWidth] = useState(0);
  const [percent, setPercent] = useState(defaultValue);

  const handleChange = (p: MovePosition) => {
    const per = Math.floor(p.x * 100) / 100;
    setPercent(per);
    if (onChange) onChange(per, Math.round(fullWidth * per));
  };

  const { ref, active } = useMove<HTMLDivElement>(handleChange);
  const width = Math.round(percent * fullWidth);

  const sliderCls = classnames([cls.slider]);
  const trackCls = classnames([cls.track, themes[variant + 'BackgroundColor']]);
  const thumbCls = classnames([cls.thumb, themes[variant + 'BackgroundColor']]);

  const handleChangeEnd = () => {
    if (!active && onChangeEnd) {
      onChangeEnd(percent, width);
    }
  };

  useDidUpdate(() => {
    handleChangeEnd();
  }, [active]);

  useEffect(() => {
    if (ref.current) {
      setFullWidth(Number(ref.current?.getBoundingClientRect()?.width));
    }
  }, [ref.current]);

  return (
    <div
      className={sliderCls}
      style={{
        height: size * 2,
        width: '100%',
      }}
      ref={ref}>
      <div
        className={cls.backTrack}
        style={{
          borderRadius: size / 2,
        }}
      />
      <div
        className={trackCls}
        style={{
          borderRadius: size / 2,
          width: width,
        }}
      />
      <div
        className={thumbCls}
        style={{
          height: size * 2,
          width: size * 2,
          left: width - size / 2,
          top: 0,
        }}
      />
    </div>
  );
}
