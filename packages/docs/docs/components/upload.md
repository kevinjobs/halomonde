---
group: 数据输入
order: 1
---

# 上传 Upload

## 上传按钮

```tsx
import { Upload } from '@horen/core';
import { useState } from 'react';

export default () => {
  const [filename, setFilename] = useState('');
  return (
    <div style={{ width: 500 }}>
      <div>
        <span>{filename}</span>
      </div>
      <Upload onChange={(e, v) => setFilename(v[0]?.name)} />
    </div>
  );
};
```

## 图片上传

```tsx
import { ImageUpload } from '@horen/core';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <ImageUpload />
    </div>
  );
};
```

## 头像上传

```tsx
import { AvatarUpload } from '@horen/core';

export default () => {
  return (
    <div style={{ width: 500 }}>
      <AvatarUpload url="#" />
    </div>
  );
};
```
