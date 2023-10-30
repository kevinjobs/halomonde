import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
}

const Ske = styled.div`
  position: relative;
  background-color: ${COLOR_MAP.white3};
  overflow: hidden;
  &::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(216, 216, 216, 0.253), transparent);
    animation: loading 1.5s infinite;
  }
  @keyframes loading {
    from { left: -100%; }
    to { left: 120%; }
  }
`;

export function Skeleton({width='100%', height=16}:SkeletonProps) {
  return (
    <Ske className='component-skeleton' style={{width, height}}>
    </Ske>
  );
}