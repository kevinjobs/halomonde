import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

export type ButtonProps = {
  type?: 'default' | 'primary' | 'success' | 'light',
  danger?: boolean,
  disabled?: boolean,
} & Omit<React.HtmlHTMLAttributes<HTMLButtonElement>, 'type'>;

const ButtonStyled = styled.button`
  height: 24px;
  padding: 0px 8px;
  margin: 0px 4px;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;

export function Button (props: ButtonProps) :React.ReactElement {
  const {
    type,
    children,
    danger,
    disabled = false,
    onClick,
    style,
    ...restProps
  } = props;

  let backgroundColor = '';
  const fontColor = COLOR_MAP.white1;

  switch (type) {
  case 'primary':
    backgroundColor = COLOR_MAP.blue;
    break;
  case 'success': 
    backgroundColor= COLOR_MAP.green;
    break;
  case 'light':
    backgroundColor = COLOR_MAP.white4;
    break;
  default:
    backgroundColor = COLOR_MAP.dark;
  }

  if (danger) backgroundColor = COLOR_MAP.red;

  return (
    <ButtonStyled
      {...restProps}
      style={{
        backgroundColor: disabled ? COLOR_MAP.white6 : backgroundColor,
        color:fontColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      onClick={e => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          onClick(e);
        }
      }}
    >
      { children }
    </ButtonStyled>
  );
}
