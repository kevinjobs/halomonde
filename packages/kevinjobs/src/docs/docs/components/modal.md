---
group: 数据展示
order: 3
---

# 弹窗 Modal

```tsx
import { useState } from 'react';
import { Modal } from '@horen/core';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>show</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Modal.Header>
          <h2>Hello</h2>
        </Modal.Header>
        <Modal.Content>
          <p>hello world!</p>
        </Modal.Content>
      </Modal>
    </div>
  );
};
```
