import { Select as Sel, type SelectProps as SP } from './Select';

import style from './Select.module.less';

export interface SelectProps extends SP {
  label?: string;
}

function Select(props: SelectProps) {
  const { label, ...restProps } = props;

  return (
    <span className={style.selectFrame}>
      {label && (
        <span className={style.selectLabel}>
          <label>{label}</label>
        </span>
      )}
      <span className={style.selectWrapper}>
        <Sel {...restProps} />
      </span>
    </span>
  );
}

Select.Item = Sel.Item;

export { Select };
