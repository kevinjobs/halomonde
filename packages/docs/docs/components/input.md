---
group: 数据输入
order: 1
---

# 输入框 Input

渲染一个原生的 Input，建议使用受控组件

## 一般输入框

<code src="./input.tsx"></code>

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
      <TagInput
        value={tags.split('|')}
        onChange={(tags) => setTags(tags.join('|'))}
      />
    </div>
  );
};
```
