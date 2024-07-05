---
group: 数据展示
order: 2
---

```tsx
/**
 * description: 回车以输入新的标签
 */
import { useState } from 'react';
import { Calendar, DatePicker } from '@horen/core';

export default () => {
  const [theme, setTheme] = useState('light');
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div>
        <button
          onClick={() => {
            if (theme === 'light') {
              setTheme('dark');
              document.documentElement.dataset.theme = 'dark';
            } else {
              setTheme('light');
              document.documentElement.dataset.theme = 'light';
            }
          }}
        >
          theme
        </button>
      </div>
      <br />
      <Calendar onChange={console.log} />
      <br />
      <br />
      <br />
      <br />
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
};
```
