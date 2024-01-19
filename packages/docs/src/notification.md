# Notification

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
