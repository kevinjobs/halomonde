---
group: 数据输入
order: 1
---

# 输入框 Input

渲染一个原生的 Input，建议使用受控组件

## 一般输入框

<code src="./input.tsx"></code>

## 文本输入框

```tsx
/**
 * description: 回车以输入新的标签
 */
import { useState } from 'react';
import { TextInput } from '@horen/core';

export default () => {
  const [n, setNum] = useState('');
  return (
    <div>
      <TextInput
        value={n}
        onChange={(v, e) => setNum(v)}
        placeholder="请输入"
      />
    </div>
  );
};
```

## 数字输入框

```tsx
/**
 * description: 回车以输入新的标签
 */
import { useState } from 'react';
import { NumberInput } from '@horen/core';

export default () => {
  const [n, setNum] = useState();
  return (
    <div>
      <NumberInput
        value={n}
        onChange={(v, e) => setNum(v)}
        placeholder="只能输入数字"
      />
    </div>
  );
};
```

## 标签输入框

```tsx
/**
 * description: 回车以输入新的标签
 */
import { useState } from 'react';
import { TagInput } from '@horen/core';

export default () => {
  const [tags, setTags] = useState('hell|input');
  return (
    <div>
      <div>{tags}</div>
      <br />
      <TagInput
        value={tags.split('|')}
        onChange={(tags) => setTags(tags.join('|'))}
      />
    </div>
  );
};
```
