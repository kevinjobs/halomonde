import React from "react";
import styled from "styled-components";

const T = styled.span`
  padding: 2px 4px;
  color: #fff;
  font-size: 0.8rem;
`;

export interface TagProps {
  theme?: string;
  color?: string;
  children?: React.ReactNode;
}

export function Tag({theme, color="#229453", children}: TagProps) {
  return (
    <T style={{backgroundColor: color}}>{children}</T>
  )
}