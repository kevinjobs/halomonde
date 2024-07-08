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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <DatePicker
        label="Date Picker"
        value={date}
        onChange={setDate}
        error="must be a date"
      />
      <br />
      <br />
      <DatePicker
        label="Date Picker"
        labelPlacement="top"
        value={date}
        onChange={setDate}
        required
        error="must be a date"
      />
    </div>
  );
};
```
