# Upload

## Button Upload

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

## Image Upload

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

## Avatar Upload

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
