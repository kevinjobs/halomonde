import React from 'react';
import styled from 'styled-components';
import { MenuProps } from '.';

const InlineStyled = styled.div`
  cursor: pointer;
`;

export default function Inline (props: Omit<MenuProps, 'mode'>) :React.ReactElement {
  const { children, ...restProps } = props;

  return (
    <InlineStyled {...restProps}>
      { children }
    </InlineStyled>
  );
}