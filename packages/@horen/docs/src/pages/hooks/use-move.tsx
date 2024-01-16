import React, { useState } from 'react';

import { useMove } from '@horen/hooks';

import { ComponentPage, Desc } from '../../components/_layout';
import { Playground } from '../../components/_playground';

export default function ComponentSlider() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { active, ref } = useMove((p) => {
    setX(p.x * ref.current?.getBoundingClientRect()?.width);
    setY(p.y * ref.current?.getBoundingClientRect()?.height);
  });

  return (
    <ComponentPage>
      <Desc
        title="useMove"
        description="useMove"
        usage="import { useMove } from '@horen/hooks'"
      />
      <Playground>
        <div
          style={{
            width: 300,
            height: 200,
            backgroundColor: '#f1f1f2',
            position: 'relative',
          }}
          ref={ref}>
          <div
            style={{
              width: 20,
              height: 20,
              backgroundColor: active ? 'red' : 'greenyellow',
              position: 'absolute',
              left: x - 10,
              top: y - 10,
            }}></div>
        </div>
      </Playground>
      <span>
        values: x: {Math.round(x)}, y: {Math.round(y)}
      </span>
    </ComponentPage>
  );
}
