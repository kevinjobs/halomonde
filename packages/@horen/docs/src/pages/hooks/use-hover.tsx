import React from 'react';
import { useHover } from '@horen/hooks';
import { ComponentPage, Desc, Playground } from '../components/_layout';

export default function ComponentSlider() {
  const { hovered, ref } = useHover();

  return (
    <ComponentPage>
      <Desc
        title='useHover'
        description='useHover'
        usage="import { useHover } from '@horen/hooks'"
      />
      <Playground>
        <div
          ref={ref}
          style={{
            width: 300,
            height: 200,
            backgroundColor: hovered ? '#7f8c' : '#f1f2f3'
          }}
        >
          {hovered ? 'hovered' : 'leave'}
        </div>
      </Playground>
    </ComponentPage>
  )
}