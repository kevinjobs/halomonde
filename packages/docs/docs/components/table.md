---
group: 数据展示
---

# 表格 Table

```tsx
import { Table } from '@horen/core';

const data = {
  head: ['姓名', '年龄', '性别'],
  body: [
    ['张三', '18', '男'],
    ['李四', '19', '女'],
    ['王五', '20', '男'],
  ],
};

export default () => <Table data={data} />;
```
