import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

const StyledHeader = styled.div`
  margin: 8px 0 16px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLOR_MAP.white4};
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.h3``;

const StyledAdd = styled.div``;

interface HeaderProps {
  children?: React.ReactNode
}

function Header (props: HeaderProps) :React.ReactElement {
  const { children } = props;

  return (
    <StyledHeader>
      { children }
    </StyledHeader>
  );
}

Header.Title = StyledTitle;
Header.Add = StyledAdd;

export default Header;