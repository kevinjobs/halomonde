import React from 'react';

import { Slider, } from '@horen/core';

import { ComponentPage, Desc, } from './_layout';
import { Playground, } from './_playground';

export default function ComponentSlider() {
  const [inactivePer, setInactivePer] = React.useState(0);
  const [w, setW] = React.useState([0, 230]);
  const [h, setH] = React.useState([0, 110]);

  return (
    <ComponentPage>
      <Desc
        title='Slider'
        description='滑动条可用于控制进度'
        usage="import { Slider } from 'horen-core'"
      />
      <Playground>
        <Slider
          onChange={(p, v) => setW([p, v])}
          onChangeEnd={(p, v) => setInactivePer(p)}
          defaultValue={0.5}
        />
        
      </Playground>
      <div>percent: {inactivePer}</div>
      <div>宽度{w[1]}px</div>
      <Playground>
        <div style={{height: 300}}>
          <Slider
            direction='vertical'
            size={20}
            onChange={(p, v) => setH([p, v])}
            onChangeEnd={(p, v) => setInactivePer(p)}
            defaultValue={0.2}
          />  
        </div>
      </Playground>
      <div>percent: {inactivePer}</div>
      <div>高度{h[1]}px</div>
    </ComponentPage>
  )
}