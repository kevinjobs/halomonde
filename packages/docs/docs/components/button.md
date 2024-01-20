---
group: 数据展示
order: 1
---

# 按钮 Button

## Base Button

```tsx
import { Button } from '@horen/core';

export default () => {
  return (
    <div>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="light">Light</Button>
      <Button variant="line">Line</Button>
    </div>
  );
};
```

## UploadButton

```tsx
import { UploadButton } from '@horen/core';

export default () => <UploadButton />;
```
