import React from 'react';
import styled from 'styled-components';

export type EditItemProps = {
  name?: string;
  label?: string;
  children: React.ReactNode;
  style?: {
    width?: number;
    minWidth?: number;
    height?: number;
    minHeight?: number;
    overflow?: string;
  };
}

const EI = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  .edit-item-label {
    margin: 0 8px 0 0;
    min-width: 32px;
    width: 32px;
    text-align: right;
  }
  .edit-item-children {
    flex-grow: 1;
  }
`;

export const EditItem = (props: EditItemProps) => {
  const { name, label, children, style } = props;
  return (
    <EI className="edit-item" data-name={name} style={{...style}}>
      <div className="edit-item-label">{label}</div>
      <div className="edit-item-children">{children}</div>
    </EI>
  );
};
