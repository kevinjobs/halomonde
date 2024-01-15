import React from 'react';
import styled from 'styled-components';

import { useToggle, } from '@horen/hooks';

const SWITCH = styled.span`
  display: inline-block;
  position: relative;
  height: 1rem;
  width: 2rem;
  background-color: #fff;
  border-radius: .5rem;
  border: 1px solid #229453;
`;
const TRACK = styled.span`
  display: inline-block;
  position: absolute;
  top: 5%;
  left: 5%;
  height: 90%;
  width: 45%;
  background-color: #229453;
  border-radius: inherit;
  transition: all 0.2s ease-in-out;
`;

export interface SwitchProps extends Omit<React.HtmlHTMLAttributes<HTMLSpanElement>, 'onChange'> {
  onChange(e: React.MouseEvent<HTMLSpanElement>, value: boolean): void;
  name: string;
  value: boolean;
}

export function Switch({onChange, name, value=false }: SwitchProps) {
  const [on, toggle] = useToggle([value, !value]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (onChange) onChange(e, !on);
    toggle();
  }

  React.useEffect(() => {
    toggle(value);
  }, [value])

  return (
    <SWITCH
      onClick={handleClick}
      style={{ borderColor: on ? '#229453' : '#333' }}
      data-name={name}
      data-value={value}
    >
      <TRACK
        data-name={name}
        style={{
          left: on ? '50%' : '5%',
          backgroundColor: on ? '#229453' : '#333'
        }}
      />
    </SWITCH>
  )
}