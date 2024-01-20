# usePagination

```tsx
import { usePagination } from '@horen/hooks';

export default () => {
  const { current, pages, next, prev } = usePagination({
    total: 8,
    current: 3,
    setCurrent: (current) => {
      return current;
    },
  });
  console.log(pages, current);
  return (
    <div>
      <button onClick={() => prev()}>prev</button>
      <button onClick={() => next()}>next</button>
    </div>
  );
};
```
