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

export function Icon({name, size=24, fill, ...restProps}: IconProps) {
  let icon;

  const ICONS = {
    'add': Add,
    'close': Close,
    'code': Code,
    'correct': Correct,
    'dimension': Dimension,
    'error': Error,
    'files': Files,
    'home': Home,
    'info': Info,
    'menu': Menu,
    'picture': Picture,
    'success': Success,
    'upload': Upload,
    'verse': Verse,
    'warning': Warning,
  }

  const I = ICONS[name];
  
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...restProps.style
      }}
    >
      <I height={size} width={size} fill={fill} />
    </span>
  )
}