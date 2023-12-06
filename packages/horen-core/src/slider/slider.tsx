import React from 'react';
import styled from 'styled-components';
import { useMove, MovePosition } from 'horen-hooks/dist/src/use-move';

export interface SliderProps {
  /**
   * 滑动条的方向，水平或者垂直，默认值为 horization 水平
   */
  direction?: 'horization' | 'vertical';
  /**
   * 滑动条值改变时的回调函数
   * 
   * param: percent 范围为 0.01 ~ 1.00
   * 
   * param: value 实际长度或宽度
   */
  onChange?(percent: number, value: number): void;
  /**
   * 滑动条的高度或宽度，默认为 8，单位为 px
   */
  size?: number;
  /**
   * 默认高度或宽度百分比，范围为 0.01 ~ 1.00，默认为 0
   */
  defaultValue?: number;
}

const S = styled.div`
  background-color: #bacf65;
  position: relative;
`;

const Track = styled.div`
  background-color: #5bae23;
  position: absolute;
  height: 100%;
`;

const Thumb = styled.div`
  position: absolute;
  height: 100%;
`;

export function Slider(props: SliderProps) {
  const {
    direction='horization',
    onChange,
    size=8,
    defaultValue=0
  } = props;
  
  const handleChange = (p: MovePosition) => {
    setWidth(w * p.x);
    setHeight(h * (1 - p.y));
    if (onChange) {
      if (direction === 'horization') onChange(p.x, w * p.x);
      else onChange((1 - p.y), h * (1 - p.y));
    }
  }

  const { ref, active } = useMove<HTMLDivElement>(handleChange);

  const w = Number(ref.current?.getBoundingClientRect().width);
  const h = Number(ref.current?.getBoundingClientRect().height);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (ref.current) {
      setWidth(w * defaultValue);
      setHeight(h * defaultValue);
    }
  }, [ref.current]);

  return (
    <S
      style={{
        height: direction === 'horization' ? size : '100%',
        width: direction === 'horization' ? '100%' : size,
        transform: direction === 'horization' ? '' : 'rotate(180deg)',
      }}
      ref={ref}
    >
      <Track
        style={{
          width: direction === 'horization' ? width : '100%',
          height: direction === 'horization' ? '100%' : height,
        }}
      />
      <Thumb
        style={{
          height: size,
          width: size,
          left: direction === 'horization' ? width - size/2 : 0,
          top: direction === 'horization' ? 0 : height - size/2,
          backgroundColor: active ? '#253d24' : '#20894d',
        }}
      />
    </S>
  )
}