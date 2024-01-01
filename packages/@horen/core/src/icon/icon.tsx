import React from "react";
import Add from './icon-add.svg';
import Close from './icon-close.svg';
import Correct from './icon-correct.svg';
import Error from './icon-error.svg';
import Upload from './icon-upload.svg';

export type IconName =
  | 'add'
  | 'close'
  | 'correct'
  | 'error'
  | 'upload';

export interface IconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: number;
  fill?: string;
}

export function Icon({name, size=24, fill='#333', ...restProps}: IconProps) {
  let icon;
  
  switch(name) {
    case 'add':
      icon = <Add height={size} width={size} fill={fill} />;
      break;
    case 'close':
      icon = <Close height={size} width={size} fill={fill} />
      break;
    case 'correct':
      icon = <Correct height={size} width={size} fill={fill} />
      break;
    case 'error':
      icon = <Error height={size} width={size} fill={fill} />
      break;
    case 'upload':
      icon = <Upload height={size} width={size} fill={fill} />;
      break;
  }

  
  return (
    <span
      {...restProps}
      style={{
        fontSize: size,
        width: size,
        height: size,
        margin: 0,
        padding: 0,
        border: 'none',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...restProps.style
      }}
    >
      {icon}
    </span>
  )
}