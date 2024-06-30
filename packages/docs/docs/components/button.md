---
group: 数据展示
order: 0
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
      <Button variant="dark">Dark</Button>
      <Button variant="light">Light</Button>
      <Button variant="line">Line</Button>
    </div>
  );
};
```

## Different Size

```tsx
import { Button } from '@horen/core';

export default () => {
  return (
    <div>
      <div>
        <Button variant="primary" size="sm">
          Primary
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="success" size="sm">
          Success
        </Button>
        <Button variant="warning" size="sm">
          Warning
        </Button>
        <Button variant="danger" size="sm">
          Danger
        </Button>
        <Button variant="dark" size="sm">
          Dark
        </Button>
        <Button variant="light" size="sm">
          Light
        </Button>
        <Button variant="line" size="sm">
          Line
        </Button>
      </div>
      <br />
      <div>
        <Button variant="primary" size="lg">
          Primary
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="success" size="lg">
          Success
        </Button>
        <Button variant="warning" size="lg">
          Warning
        </Button>
        <Button variant="danger" size="lg">
          Danger
        </Button>
        <Button variant="dark" size="lg">
          Dark
        </Button>
        <Button variant="light" size="lg">
          Light
        </Button>
        <Button variant="line" size="lg">
          Line
        </Button>
      </div>
    </div>
  );
};
```

## UploadButton

```tsx
import { UploadButton } from '@horen/core';

export default () => <UploadButton />;
```
