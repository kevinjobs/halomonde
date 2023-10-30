import React from 'react';
import COLOR_MAP from '@/styles/colors';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export type LinkProps = {
  to: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} & Omit<React.HtmlHTMLAttributes<any>, ''>;

const LinkStyled = styled(NavLink)`
  text-decoration: none;
  color: ${COLOR_MAP.dark};
  &:visited {
    color: ${COLOR_MAP.dark};
  }
  &:hover {
    color: ${COLOR_MAP.primary};
  }
`;

export function Link (props: LinkProps) :React.ReactElement {
  const { to, children, ...restProps } = props;

  return (
    <LinkStyled
      to={to}
      {...restProps}
    >
      { children }
    </LinkStyled>
  );
}
