import React from "react";
import styled from "styled-components";
import { useToggle } from "@horen/hooks";

const S = styled.span`
  display: inline-block;
  position: relative;
  height: 1rem;
  width: 2rem;
  background-color: #fff;
  border-radius: .5rem;
  border: 1px solid #229453;
`;
const T = styled.span`
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

export interface SwitchProps {
  onChange(value: boolean): void;
  defaultValue?: boolean;
}

export function Switch({onChange, defaultValue}: SwitchProps) {
  const [on, toggle] = useToggle();

  const handleClick = () => {
    if (onChange) onChange(!on);
    toggle();
  }

  React.useEffect(() => {
    if (defaultValue !== undefined) toggle(defaultValue);
  }, []);

  return (
    <S
      onClick={handleClick}
      style={{
        borderColor: on ? '#229453' : '#333'
      }}
    >
      <T
        style={{
          left: on ? '50%' : '5%',
          backgroundColor: on ? '#229453' : '#333'
        }}
      />
    </S>
  )
}