import React from 'react';
import { classnames } from '../_utils';
import cls from './Icon.module.less';

import Add from './icon-add.svg';
import Aperture from './icon-aperture.svg';
import Ban from './icon-ban.svg';
import Camera from './icon-camera.svg';
import Clock from './icon-clock.svg';
import Close from './icon-close.svg';
import Code from './icon-code.svg';
import Correct from './icon-correct.svg';
import Date from './icon-date.svg';
import Dimension from './icon-dimension.svg';
import Down from './icon-down.svg';
import Error from './icon-error.svg';
import Exposure from './icon-exposure.svg';
import Files from './icon-files.svg';
import Focal from './icon-focal.svg';
import Home from './icon-home.svg';
import Info from './icon-info.svg';
import Iso from './icon-iso.svg';
import Lens from './icon-lens.svg';
import Location from './icon-location.svg';
import Logout from './icon-logout.svg';
import Menu from './icon-menu.svg';
import Picture from './icon-picture.svg';
import Success from './icon-success.svg';
import Upload from './icon-upload.svg';
import Up from './icon-up.svg';
import User from './icon-user.svg';
import Verse from './icon-verse.svg';
import Vip from './icon-vip.svg';
import Warning from './icon-warning.svg';

export type IconName =
  | 'add'
  | 'aperture'
  | 'ban'
  | 'camera'
  | 'close'
  | 'clock'
  | 'code'
  | 'correct'
  | 'date'
  | 'dimension'
  | 'down'
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
  | 'up'
  | 'user'
  | 'verse'
  | 'vip'
  | 'warning';

export interface IconProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: number;
  fill?: string;
}

export function Icon({
  className,
  name,
  size = 24,
  fill,
  ...restProps
}: IconProps) {
  let icon;

  const ICONS = {
    add: Add,
    aperture: Aperture,
    ban: Ban,
    camera: Camera,
    close: Close,
    clock: Clock,
    date: Date,
    code: Code,
    correct: Correct,
    dimension: Dimension,
    down: Down,
    error: Error,
    exposure: Exposure,
    files: Files,
    focal: Focal,
    home: Home,
    info: Info,
    iso: Iso,
    lens: Lens,
    logout: Logout,
    location: Location,
    menu: Menu,
    picture: Picture,
    success: Success,
    upload: Upload,
    up: Up,
    user: User,
    verse: Verse,
    vip: Vip,
    warning: Warning,
  };

  const I = ICONS[name];

  const classname = classnames({
    [className || '']: Boolean(className),
    [cls.icon]: true,
  });

  return (
    <span
      className={classname}
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
        ...restProps.style,
      }}>
      <I height={size} width={size} fill={fill} />
    </span>
  );
}
