import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';

const M = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.75);
  z-index: 998;
`;

export function Mask() {
  const MASK_ID = 'mask-container';
  let container = document.getElementById(MASK_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = MASK_ID;
    document.body.appendChild(container);
  }

  return document.getElementById(MASK_ID)
    ? ReactDOM.createPortal(<M/>, document.getElementById(MASK_ID))
    : '';
}
