---
group: 数据展示
order: 3
---

# 弹窗 Modal

```tsx
import { useState } from 'react';
import { useForm } from '@horen/hooks';
import { TextInput } from '@horen/core';

export default () => {
  const form = useForm({
    initialValues: {
      name: 'horen',
      password: '123456',
    },
    validation: {
      name: (value) => (value === 'horen' ? null : 'name must be horen'),
      password: (value) =>
        /^\d+$/.test(value) ? null : 'password must be number',
    },
  });

  console.log(form.getProps('name').error);

  return (
    <div>
      <TextInput {...form.getProps('name')} label="name" />
      <TextInput {...form.getProps('password')} label="password" />
    </div>
  );
};
```
