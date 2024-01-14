import React from 'react';

import Add from './icon-add.svg';
import Aperture from './icon-aperture.svg';
import Clock from './icon-clock.svg';
import Close from './icon-close.svg';
import Code from './icon-code.svg';
import Correct from './icon-correct.svg';
import Date from './icon-date.svg';
import Dimension from './icon-dimension.svg';
import Error from './icon-error.svg';
import Files from './icon-files.svg';
import Home from './icon-home.svg';
import Info from './icon-info.svg';
import Iso from './icon-iso.svg';
import Location from './icon-location.svg';
import Logout from './icon-logout.svg';
import Menu from './icon-menu.svg';
import Picture from './icon-picture.svg';
import Success from './icon-success.svg';
import Upload from './icon-upload.svg';
import User from './icon-user.svg';
import Verse from './icon-verse.svg';
import Vip from './icon-vip.svg';
import Warning from './icon-warning.svg';
import Exposure from './icon-exposure.svg';
import Focal from './icon-focal.svg';
import Lens from './icon-lens.svg';
import Camera from './icon-camera.svg';


export type IconName =
  | 'add'
  | 'aperture'
  | 'camera'
  | 'close'
  | 'clock'
  | 'code'
  | 'correct'
  | 'date'
  | 'dimension'
  | 'error'
  | 'exposure'
  | 'files'
  | 'focal'
  | 'home'
  | 'lens'
  | 'location'
  | 'logout'
  | 'info'
  | 'iso'
  | 'menu'
  | 'picture'
  | 'success'
  | 'upload'
  | 'user'
  | 'verse'
  | 'vip'
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
    'aperture': Aperture,
    'camera': Camera,
    'close': Close,
    'clock': Clock,
    'date': Date,
    'code': Code,
    'correct': Correct,
    'dimension': Dimension,
    'error': Error,
    'exposure': Exposure,
    'files': Files,
    'focal': Focal,
    'home': Home,
    'info': Info,
    'iso': Iso,
    'lens': Lens,
    'logout': Logout,
    'location': Location,
    'menu': Menu,
    'picture': Picture,
    'success': Success,
    'upload': Upload,
    'user': User,
    'verse': Verse,
    'vip': Vip,
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