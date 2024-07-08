# 通知系统

通知系统

```tsx
import { notifications, Notifications } from '@horen/notifications';
import { Button } from '@horen/core';

export default () => (
  <div>
    <Notifications />
    <Button
      variant="success"
      onClick={() =>
        notifications.show({ variant: 'success', message: 'success' })
      }
    >
      success
    </Button>
    <br />
    <br />
    <Button
      variant="warning"
      onClick={() =>
        notifications.show({ variant: 'warning', message: 'warning' })
      }
    >
      warning
    </Button>
    <br />
    <br />
    <Button
      variant="danger"
      onClick={() =>
        notifications.show({ variant: 'danger', message: 'danger' })
      }
    >
      danger
    </Button>
    <br />
    <br />
    <Button
      variant="info"
      onClick={() => notifications.show({ variant: 'info', message: 'info' })}
    >
      info
    </Button>
  </div>
);
```
