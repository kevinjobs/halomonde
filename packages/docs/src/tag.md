# Tag

Tag 组件渲染的是一个普通的 `<span>Text</span>`，因此可以使用原生的属性

```tsx
/**
 * title: 使用主题色
 * description: 使用默认的主题色
 */
import { Tag } from '@horen/core';

export default () => {
  return (
    <div>
      <Tag>default</Tag>
      <Tag variant="primary">primary</Tag>
      <Tag variant="secondary">secondary</Tag>
      <Tag variant="success">success</Tag>
      <Tag variant="warning">warning</Tag>
      <Tag variant="danger">danger</Tag>
      <Tag variant="info">info</Tag>
    </div>
  );
};
```

```tsx
/**
 * title: 配置颜色
 * description: 配置 color 以自定义颜色
 */
import { Tag } from '@horen/core';

export default () => {
  return (
    <div>
      <Tag color="red">red</Tag>
      <Tag color="green">green</Tag>
      <Tag color="teal">teal</Tag>
      <Tag color="#cfa179">#cfa179</Tag>
    </div>
  );
};
```

```tsx
/**
 * title: 同时配置
 * description: color 会覆盖 variant
 */
import { Tag } from '@horen/core';

export default () => {
  return (
    <div>
      <Tag variant="primary" color="#cfa179">
        #cfa179
      </Tag>
    </div>
  );
};
```

```tsx
/**
 * title: 圆角
 * description: 设置圆角，不可自定义圆角角度，但可以通过 style 改变圆角
 */
import { Tag } from '@horen/core';

export default () => {
  return (
    <div>
      <Tag rounded>rounded</Tag>
      <Tag style={{ borderRadius: '50%' }}>styled rounded</Tag>
    </div>
  );
};
```

## API

```ts
type TagVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

interface TagProps extends AllHTMLAttributes<HTMLSpanElement> {
  // 类型，默认：primary
  variant?: TagVariant;
  // 颜色值，默认：undefined
  color?: string;
  children?: React.ReactNode;
  // 是否圆角，默认: false
  rounded?: boolean;
}
```
