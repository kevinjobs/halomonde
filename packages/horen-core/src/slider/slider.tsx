import React from 'react';
import styled from 'styled-components';
import { useMove } from 'horen-hooks';

export interface SliderProps {
  direction?: 'horization' | 'vertical';
  onChange?(): void;
  size?: number;
}

const S = styled.div``;

const Track = styled.div``;

const Thumb = styled.div``;

export function Slider(props: SliderProps) {
  const { direction='horization', onChange, size=4 } = props;

  return (
    <S style={{height: size}}>
      <Track />
      <Thumb />
    </S>
  )
}