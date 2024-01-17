# Switch

```tsx
import { useState } from 'react';
import { Switch } from '@horen/core';

export default () => {
  const [on, setOn] = useState(false);

  const handleChange = (_, v: boolean) => {
    setOn(v);
  };

  return (
    <div>
      <Switch value={on} onChange={handleChange} />
    </div>
  );
};
```
