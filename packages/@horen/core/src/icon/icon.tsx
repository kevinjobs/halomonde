import React from "react";
import Add from './icon-add.svg';
import Close from './icon-close.svg';
import Code from './icon-code.svg';
import Correct from './icon-correct.svg';
import Dimension from './icon-dimension.svg';
import Error from './icon-error.svg';
import Files from './icon-files.svg';
import Home from './icon-home.svg';
import Info from './icon-info.svg';
import Menu from './icon-menu.svg';
import Picture from './icon-picture.svg';
import Success from './icon-success.svg';
import Upload from './icon-upload.svg';
import Verse from './icon-verse.svg';
import Warning from './icon-warning.svg';

export type IconName =
  | 'add'
  | 'close'
  | 'code'
  | 'correct'
  | 'dimension'
  | 'error'
  | 'files'
  | 'home'
  | 'info'
  | 'menu'
  | 'picture'
  | 'success'
  | 'upload'
  | 'verse'
  | 'warning';

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
      icon = <Close height={size} width={size} fill={fill} />;
      break;
    case 'code':
      icon = <Code height={size} width={size} fill={fill} />;
      break;
    case 'correct':
      icon = <Correct height={size} width={size} fill={fill} />;
      break;
    case 'dimension':
      icon = <Dimension height={size} width={size} fill={fill} />;
      break;
    case 'error':
      icon = <Error height={size} width={size} fill={fill} />;
      break;
    case 'files':
      icon = <Files height={size} width={size} fill={fill} />;
      break;
    case 'home':
      icon = <Home height={size} width={size} fill={fill} />;
      break;
    case 'info':
      icon = <Info height={size} width={size} fill={fill} />;
      break;
    case 'menu':
      icon = <Menu height={size} width={size} fill={fill} />;
      break;
    case 'picture':
      icon = <Picture height={size} width={size} fill={fill} />;
      break;
    case 'success':
      icon = <Success height={size} width={size} fill={fill} />;
      break;
    case 'upload':
      icon = <Upload height={size} width={size} fill={fill} />;
      break;
    case 'verse':
      icon = <Verse height={size} width={size} fill={fill} />;
      break;
    case 'warning':
      icon = <Warning height={size} width={size} fill={fill} />;
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