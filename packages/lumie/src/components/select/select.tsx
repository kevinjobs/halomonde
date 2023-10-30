import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';
import { Down } from '@icon-park/react';

export type SelectProps = {
  defaultValue?: string;
  onChange(value: string): void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export type OptionProps = {
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Sel = styled.div`
  height: 24px;
  border: 1px solid ${COLOR_MAP.white6};
  position: relative;
  background-color: ${COLOR_MAP.white};
  &:focus {
    border: 1px solid ${COLOR_MAP.blue};
    .children-option {
      border: 1px solid ${COLOR_MAP.blue};
      border-top: none;
    }
  }
  .default-option {
    height: 24px;
    display: flex;
    align-items: center;
    padding: 0 4px;
    user-select: none;
    position: relative;
    border: none;
    .arrow {
      position: absolute;
      right: 4px;
      top: 1px;
    }
  }
  .children-option {
    overflow: hidden;
    position: absolute;
    left: -1px;
    width: 100%;
    transition: height .1s ease-in-out;
    z-index: 1;
  }
`;
const Opt = styled.div`
  height: 24px;
  width: 100%;
  user-select: none;
  display: flex;
  align-items: center;
  background-color: ${COLOR_MAP.white};
  padding: 0 4px;
  &:hover {
    background-color: ${COLOR_MAP.primary};
    color: ${COLOR_MAP.white}
  }
`;

export const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { children, defaultValue, onChange, ...rest } = props;
  const [ value, setValue ] = React.useState(null);
  const [ height, setHeight ] = React.useState(0);

  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.className === 'default-option') {
      if (height > 0) {
        setHeight(0);
        return;
      }
      const len = ref?.current?.children.length;
      setHeight(24 * len);
      return;
    }

    const v = target.dataset['value'];
    setValue(v);
    setHeight(0);
    if (onChange) onChange(v);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {

  }

  const findName = (v: string) => {
    const childs = ref?.current?.children;
    if (!childs) return;
    for (const child of childs) {
      const c = child as HTMLElement;
      if (c.dataset['value'] === v) {
        return c.dataset['name'];
      }
    }
  };

  React.useEffect(() => {
    if (!defaultValue) {
      const childs = ref?.current?.children;
      const first = childs[0] as HTMLElement;
      setValue(first.dataset['value']);
    } else {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Sel
      {...rest}
      onClick={handleClick}
      onBlur={() => setHeight(0)}
      tabIndex={0}
    >
      <div className='default-option'>
        { findName(value) }
        <span className='arrow' onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}>
          <Down theme="outline" size="24" fill="#333"/>
        </span>
      </div>
      <div
        className='children-option'
        ref={ref}
        style={{height}}
      >{ children }</div>
    </Sel>
  );
};

export const Option: React.FC<OptionProps> = (props: OptionProps) => {
  const { name, value, ...rest } = props;
  return (
    <Opt {...rest} data-name={name} data-value={value}>
      { name }
    </Opt>
  );
};
