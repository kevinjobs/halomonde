import React from "react";
import styled from "styled-components";

const T = styled.span`
  padding: 2px 4px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 300;
`;

export interface TagProps {
  theme?: string;
  color?: string;
  children?: React.ReactNode;
  /**
   * 是否圆角
   */
  rounded?: boolean;
}

export function Tag({theme, color="#229453", children, rounded=false}: TagProps) {
  return (
    <T
      style={{backgroundColor: color, borderRadius: rounded ? 4 : 0}}
    >{children}</T>
  )
}