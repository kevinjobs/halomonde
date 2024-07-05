---
group: 数据输入
order: 3
---

# 选择框 Select

## Uncontrolled Select

```tsx
import { Select } from '@horen/core';

export default () => (
  <div style={{ width: 300 }}>
    <Select value="5" label="Test">
      <Select.Item name="value1" label="小说" value="1" />
      <Select.Item name="value2" label="动画" value="2" />
      <Select.Item name="value3" label="电影" value="3" />
      <Select.Item name="value4" label="音乐" value="4" />
      <Select.Item name="value5" label="游戏" value="5" />
    </Select>
  </div>
);
```

## Controlled Select

```tsx
import { useState } from 'react';
import { Select } from '@horen/core';

export default () => {
  const [value, setValue] = useState('1');

  return (
    <div style={{ width: 300 }}>
      <Select value={value} onChange={(_, v) => setValue(v)}>
        <Select.Item name="value1" value="1" />
        <Select.Item name="value2" value="2" />
        <Select.Item name="value3" value="3" />
        <Select.Item name="value4" value="4" />
        <Select.Item name="value5" value="5" />
      </Select>
    </div>
  );
};
```
