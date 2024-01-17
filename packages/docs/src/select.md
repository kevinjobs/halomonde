# Select

## Uncontrolled Select

```tsx
import { Select } from '@horen/core';

export default () => (
  <div style={{ width: 300 }}>
    <Select value="5">
      <Select.Item name="value1" value="1" />
      <Select.Item name="value2" value="2" />
      <Select.Item name="value3" value="3" />
      <Select.Item name="value4" value="4" />
      <Select.Item name="value5" value="5" />
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
