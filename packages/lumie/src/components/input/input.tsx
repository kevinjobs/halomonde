import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

export type InputProps = {
  label?: string,
  style?: React.CSSProperties,
  name?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputStyled = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0px;
  label {
    display: inline-block;
  }
  input {
    display: inline-block;
    height: 22px;
    padding: 0px 4px;
    margin: 0;
    border: 1px solid ${COLOR_MAP.white5};
    border-radius: 0;
    flex-grow: 1;
    :focus {
      border-color: ${COLOR_MAP.blue};
      outline: none;
    }
  }
`;

export function Input (props: InputProps) :React.ReactElement {
  const { label, name, style, ...restProps } = props;

  return (
    <InputStyled style={style}>
      { label && <label>{ label }</label> }
      <input
        data-label={label}
        data-name={name}
        {...restProps}
      />
    </InputStyled>
  );
}
