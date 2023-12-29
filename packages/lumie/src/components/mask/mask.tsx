import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';

const M = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.75);
`;

export function Mask() {
  useEffect(() => {
    const container = document.createElement('div');
    container.id = 'mask-container';
    document.body.appendChild(container);
  }, []);
  return document.getElementById('mask-container')
    ? ReactDOM.createPortal(<M/>, document.getElementById('mask-container'))
    : <div></div>;
}
