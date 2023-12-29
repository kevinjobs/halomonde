import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const BUTTON = styled.button`
  border: none;
  border-radius: 5px;
  color: #222;
  background-color: #fff;
  padding: 6px 12px;
  font-size: 0.9rem;
  &.button-primary {
    background-color: #3498DB;
    color: #fff;
    &:hover {
      background-color: #3498dbe4;
    }
  }
  &.button-success {
    background-color: #2ECC71;
    color: #fff;
    &:hover {
      background-color: #2ecc70e7;
    }
  }
  &.button-warning {
    background-color: #F4D03F;
    color: #fff;
    &:hover {
      background-color: #f4d03fde;
    }
  }
  &.button-dark {
    background-color: #333;
    color: #fff;
    &:hover {
      background-color: #444;
    }
  }
  &.button-light {
    background-color: #e5e7e9ed;
    &:hover {
      background-color: #cfd0d0;
    }
  }
  &.button-error {
    background-color: #E74C3C;
    color: #fff;
    &:hover {
      background-color: #ff654dec;
    }
  }
  &.button-line {
    border: 1px solid #aaa;
    color: #555;
  }
  &:active {
    position: relative;
    top: 2px;
    transition: top 0.3s ease-in-out;
  }
  &:disabled {
    background-color: #BDC3C7;
    cursor: not-allowed;
    &:hover {
      background-color: #BDC3C7;
    }
    &:active {
      position: static;
    }
  }
`;

export type ButtonProps = {
  type?: 'primary' | 'success' | 'warning' | 'dark' | 'light' | 'error' | 'line';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export function Button(props: ButtonProps) {
  const { type='primary', children, ...restProps } = props;
  
  const cls = 'button-' + type;

  return (
    <BUTTON className={cls} {...restProps}>{children}</BUTTON>
  )
}
