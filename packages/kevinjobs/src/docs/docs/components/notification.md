---
group: 数据展示
order: 3
---

# 消息 Notification

```tsx
import { Notification } from '@horen/core';

export default () => (
  <div>
    <div>
      <Notification variant="info" message={'This is an info message'} />
    </div>
    <div>
      <Notification variant="success" />
    </div>
    <div>
      <Notification variant="warning" />
    </div>
    <div>
      <Notification variant="danger" />
    </div>
  </div>
);
```
