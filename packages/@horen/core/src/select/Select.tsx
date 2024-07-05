import React, { createContext, useContext, useEffect, useState } from 'react';
import { Popover } from '../Popover';
import { Icon } from '../icon';
import style from './Select.module.less';

export type SelectValueType = string | number | boolean | null;

export interface SelectProps {
  onChange?(
    value: SelectValueType,
    e: React.MouseEvent<HTMLElement> | null,
  ): void;
  value: string;
  children: React.ReactNode;
}

export interface SelectValue {
  name: string;
  label: string;
  value: SelectValueType;
}

export type SelectItemProps = SelectValue;

const SelectContext = createContext<{
  setValues: (value: SelectValue) => void;
}>({
  setValues: () => {},
});

function Select({ onChange, children, value }: SelectProps) {
  const [open, setOpen] = useState(false);

  const [kw, setKw] = useState<SelectValue[]>([]);
  const [selected, setSelected] = useState<SelectValue | null>(null);

  const handleClickContent = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    const label = target.dataset['label'];
    const name = target.dataset['name'];
    const value = target.dataset['value'] || null;

    if (label && name) {
      setSelected({ label, name, value });
      if (onChange) onChange(value, e);
    }

    setOpen(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };

  useEffect(() => {
    for (const item of kw) {
      if (item.value === value) {
        setSelected(item);
      }
    }
  }, [kw]);

  return (
    <SelectContext.Provider
      value={{
        setValues: (value: SelectValue) => {
          setKw((prev) => [...prev, value]);
        },
      }}>
      <div className={style.select}>
        <Popover
          open={open}
          onClickTarget={() => setOpen(!open)}
          onClickContent={handleClickContent}
          onClickOutside={handleClickOutside}>
          <Popover.Target>
            <div className={style.target}>
              <div>
                <div>{selected?.label}</div>
                <div>
                  <Icon name="down" size={16} />
                </div>
              </div>
            </div>
          </Popover.Target>
          <Popover.Content>
            <div className={style.content}>{children}</div>
          </Popover.Content>
        </Popover>
      </div>
    </SelectContext.Provider>
  );
}

function Item({ name, value, label }: SelectItemProps) {
  const { setValues } = useContext(SelectContext);

  useEffect(() => {
    setValues({ name, value, label: label || name });
  }, []);

  return (
    <div
      className={style.selectItem}
      data-name={name}
      data-value={value}
      data-label={label || name}>
      {label || name}
    </div>
  );
}

Select.Item = Item;

export { Select };
