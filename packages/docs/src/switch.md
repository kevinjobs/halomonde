# Switch

```tsx
/**
 * title: 受控组件
 * description: 默认样式
 */
import { useState } from 'react';
import { Switch } from '@horen/core';

export default () => {
  const [on, setOn] = useState(false);

  const handleChange = (_, v: boolean) => {
    setOn(v);
  };

  return (
    <div>
      <Switch defaultValue={true} value={on} onChange={handleChange} />
    </div>
  );
};
```

```tsx
/**
 * title: 不同样式
 * description: 选择主题样式
 */
import { useState } from 'react';
import { Switch } from '@horen/core';

export default () => {
  const [on, setOn] = useState(false);

  const handleChange = (_, v: boolean) => {
    setOn(v);
  };

  return (
    <div>
      <Switch defaultValue={true} value={on} onChange={handleChange} />
      <br />
      <Switch
        variant="secondary"
        defaultValue={false}
        value={on}
        onChange={handleChange}
      />
      <br />
      <Switch
        variant="info"
        defaultValue={false}
        value={on}
        onChange={handleChange}
      />
      <br />
      <Switch
        variant="success"
        defaultValue={false}
        value={on}
        onChange={handleChange}
      />
      <br />
      <Switch
        variant="warning"
        defaultValue={false}
        value={on}
        onChange={handleChange}
      />
      <br />
      <Switch
        variant="danger"
        defaultValue={false}
        value={on}
        onChange={handleChange}
      />
    </div>
  );
};
```

```tsx
/**
 * title: 禁用组件
 * description: 禁用 Switch 组件
 */
import { useState } from 'react';
import { Switch } from '@horen/core';

export default () => {
  const [on, setOn] = useState(false);

  const handleChange = (_, v: boolean) => {
    setOn(v);
  };

  return (
    <div>
      <Switch disabled defaultValue={true} value={on} onChange={handleChange} />
    </div>
  );
};
```
