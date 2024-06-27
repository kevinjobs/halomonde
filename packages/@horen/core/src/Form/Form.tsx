import React from 'react';

export interface FormProps {
  children: React.ReactNode;
}

export function Form(props: FormProps) {
  return <div>{props.children}</div>;
}
