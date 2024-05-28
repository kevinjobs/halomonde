---
group: 数据展示
order: 2
---

```tsx
/**
 * description: 回车以输入新的标签
 */
import { useState } from 'react';
import { Draggable } from '@horen/core';

export default () => {
  return (
    <div style={{ height: 300, backgroundColor: 'green' }}>
      <Draggable>
        <div>hello</div>
      </Draggable>
    </div>
  );
};
```
