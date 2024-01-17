import React, { TextareaHTMLAttributes as THA } from 'react';
import style from './TextArea.module.less';

export interface TextAreaProps extends THA<HTMLTextAreaElement> {}

export default function TextArea(props: TextAreaProps) {
  return <textarea className={style.textarea} {...props} />;
}
