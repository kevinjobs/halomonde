import React from 'react';
import { Slider } from '@horen/core';
import { ComponentPage, Desc, Playground } from './_layout';

export default function ComponentSlider() {
  const [inactivePer, setInactivePer] = React.useState(0);
  const [w, setW] = React.useState([0, 230]);
  const [h, setH] = React.useState([0, 110]);

  return (
    <ComponentPage>
      <Desc
        title='Slider'
        description='a slider to control progress of something'
        usage="import { Slider } from 'horen-core'"
      />
      <Playground>
        <Slider
          onChange={(p, v) => setW([p, v])}
          onChangeEnd={(p, v) => setInactivePer(p)}
          defaultValue={0.5}
        />
        <div>{inactivePer}</div>
        <div>宽度{w[1]}px</div>
      </Playground>
      <Playground height={300}>
        <Slider
          direction='vertical'
          size={20}
          onChange={(p, v) => setH([p, v])}
          onChangeEnd={(p, v) => setInactivePer(p)}
          defaultValue={0.2}
        />
        <div>{inactivePer}</div>
        <div>高度{h[1]}px</div>
      </Playground>
    </ComponentPage>
  )
}