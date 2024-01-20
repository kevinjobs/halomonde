---
group: 数据输入
order: 2
---

# 分割框 Segment

```tsx
import { useState } from 'react';
import { Segment } from '@horen/core';

export default () => {
  const [value, setValue] = useState('world');
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <span>VALUE: </span>
        <span>{value}</span>
      </div>
      <br />
      <br />
      <Segment variant="light" value={value} onChange={(v) => setValue(v)}>
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
    </div>
  );
};
```

```tsx
import { Segment } from '@horen/core';

export default () => {
  return (
    <div>
      <Segment variant="dark">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="primary">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="secondary">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="success">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="warning">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="info">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
      <br />
      <br />
      <Segment variant="light">
        <Segment.Item label="图片" value="hello" />
        <Segment.Item label="封面" value="world" />
        <Segment.Item label="文章" value="break" />
      </Segment>
    </div>
  );
};
```
