# Slider

```tsx
/**
 * title: 基本使用
 * description: 推荐使用受控组件
 */
import { useState } from 'react';
import { Slider } from '@horen/core';

export default () => {
  const [per, setPer] = useState(0);
  const [v, setV] = useState(0);
  const [endPer, setEndPer] = useState(0);
  const [endV, setEndV] = useState(0);

  return (
    <div>
      <p>
        <span>percent: </span>
        {per}
      </p>
      <p>
        <span>value: </span>
        {v}px
      </p>
      <p>
        <span>end percent: </span>
        {endPer}
      </p>
      <p>
        <span>end value: </span>
        {endV}px
      </p>
      <Slider
        defaultValue={0.3}
        onChange={(p, v) => {
          setPer(p);
          setV(v);
        }}
        onChangeEnd={(p, v) => {
          setEndPer(p);
          setEndV(v);
        }}
      />
    </div>
  );
};
```

```tsx
/**
 * title: 不同样式
 * description: 与主题色一致
 */
import { Slider } from '@horen/core';

export default () => {
  return (
    <div>
      <Slider defaultValue={0.44} />
      <br />
      <Slider variant="secondary" defaultValue={0.5} />
      <br />
      <Slider variant="success" defaultValue={1} />
      <br />
      <Slider variant="warning" defaultValue={0.3} />
      <br />
      <Slider variant="danger" defaultValue={0.7} />
      <br />
      <Slider variant="info" defaultValue={0.1} />
    </div>
  );
};
```
