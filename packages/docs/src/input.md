# Input

渲染一个原生的 Input，建议使用受控组件

<code src="./input.tsx"></code>

```tsx
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
