import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-bottom: 64px;
`;

interface ContainerProps {
  children?: React.ReactNode,
}

export default function Container (props: ContainerProps) :React.ReactElement {
  const { children } = props;

  return (
    <Wrapper>
      { children }
    </Wrapper>
  );
}
