import React from 'react';
import styled from 'styled-components';
import COLOR_MAP from '@/styles/colors';

export type TagProps = {
  color?: string,
} & React.HtmlHTMLAttributes<HTMLSpanElement>;

const TagStyled = styled.span`
  display: inline-block;
  color: ${COLOR_MAP.white};
  padding: 2px 4px;
  margin: 4px 2px;
  font-size: 0.8rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  line-height: 0.8rem;
  cursor: default;
`;

export function Tag (props: TagProps) :React.ReactElement {
  const { children, color = 'blue', ...restProps } = props;

  return (
    <TagStyled
      {...restProps}
      style={{backgroundColor: COLOR_MAP[color]}}
    >
      { children }
    </TagStyled>
  );
}
