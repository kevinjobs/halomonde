# Button

## Base Button

```tsx
import { Button } from '@horen/core';

export default () => {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="danger">danger</Button>
      <Button type="light">Light</Button>
      <Button type="line">Line</Button>
    </div>
  );
};
```

| props | type   | values                                                              | default   |
| ----- | ------ | ------------------------------------------------------------------- | --------- |
| type  | string | "primary" \| "success" \| "warning" \| "error" \| "light" \| "line" | "primary" |

## UploadButton

```tsx
import { UploadButton } from '@horen/core';

export default () => <UploadButton />;
```
