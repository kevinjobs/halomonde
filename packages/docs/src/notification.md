# Notification

```tsx
import { Notification } from '@horen/core';

export default () => (
  <div>
    <div>
      <Notification type="info" message={'This is an info message'} />
    </div>
    <div>
      <Notification type="success" />
    </div>
    <div>
      <Notification type="warning" />
    </div>
    <div>
      <Notification type="error" />
    </div>
  </div>
);
```
