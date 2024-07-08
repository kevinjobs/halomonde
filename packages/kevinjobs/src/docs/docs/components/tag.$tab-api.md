渲染一个原生的 `<span>text</span>` 元素

## Props

### variant <code>TagVariant</code>

- 默认值 <code>'primary'</code>

- 可选值

  - 'primary'
  - 'secondary'
  - 'success'
  - 'warning'
  - 'danger'
  - 'info'

### color <code>string</code>

默认传入 `style.color` 属性，因此可以使用 `#ffffff` `rgba(255,255,255,0.5)` `rgb(255,255,255)` 等形式

- 是否可空 <code>是</code>

- 默认值 <code>无</code>

### children <code>React.ReactNode</code>

- 是否可空 <code>是</code>

- 默认值 <code>无</code>

### rounded <code>boolean</code>

- 是否可空 <code>是</code>

- 默认值 <code>false</code>

## 定义

```ts
type TagVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

interface TagProps extends AllHTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  color?: string;
  children?: React.ReactNode;
  rounded?: boolean;
}
```
