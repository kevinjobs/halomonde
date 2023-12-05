import React from 'react';
import { Slider } from 'horen-core';

export default function ComponentSlider() {
  const [w, setW] = React.useState([0, 230]);
  const [h, setH] = React.useState([0, 110]);

  return (
    <div>
      <div>
        <Slider onChange={(p, v) => setW([p, v])} defaultValue={0.5} />
        <div>宽度{w[1]}px</div>
      </div>
      <div style={{height: 600, marginTop: 8}}>
        <Slider direction='vertical' size={20} onChange={(p, v) => setH([p, v])} defaultValue={0.2} />
        <div>高度{h[1]}px</div>
      </div>
    </div>
  )
}