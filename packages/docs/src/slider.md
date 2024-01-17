# Slider

```tsx
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
