import React from 'react';
import styled from 'styled-components';

import { Spin } from '../spin';
import { Loading2 } from './loading2';

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export interface LoadingProps {
  type?: 'dot-circle' | '2'
}

export function Loading (props: LoadingProps) {
  const { type = 'dot-circle' } = props;

  const render = (t: string) => {
    let final;

    switch (t) {
    case 'dot-circle':
      final = <Spin />;
      break;
    case '2':
      final = <Loading2 />;
      break;
    default:
      final = <Spin />;
    }

    return final;
  };

  return (
    <Container>
      { render(type) }
    </Container>
  );
}
