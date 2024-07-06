# 表单 Form

```tsx
import { useState } from 'react';
import { useForm } from '@horen/hooks';
import { TextInput, NumberInput } from '@horen/core';

export default () => {
  const form = useForm({
    initialValues: {
      name: 'horen',
      password: '123456',
    },
    validateOnChange: false,
    validation: {
      name: (value) => {
        if (!value) return 'name is required';
        return value === 'horen' ? null : 'name must be horen';
      },
      password: (value) => {
        if (!value) return 'password is required';
        return /^\d+$/.test(value) ? null : 'password must be number';
      },
      mark: (value: string) => {
        if (!value) return 'mark is required';
        if (value.length < 5) return 'mark must be more than 5';
        if (value.length > 10) return 'mark must be less than 10';
      },
    },
  });

  const handleSubmit = (values, e) => {
    e.preventDefault();
    const errors = values['errors'];
    if (Object.keys(errors).length === 0) {
      console.log(values);
    }
  };

  const onSetValues = () => {
    form.setValues((prev) => {
      return {
        name: 'horen-1',
        password: '123456-1',
        mark: 'mark-1',
      };
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div>
        <TextInput {...form.getProps('name')} label="用户名" />
      </div>
      <div>
        <TextInput {...form.getProps('password')} label="密码" required />
      </div>
      <div>
        <TextInput
          {...form.getProps('mark')}
          label="备注"
          labelPlacement="top"
          required
        />
      </div>
      <div>
        <NumberInput {...form.getProps('age')} label="年龄" />
      </div>
      <button type="submit">提交</button>
      <button onClick={onSetValues}>set values</button>
    </form>
  );
};
```
