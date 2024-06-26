import { BaseVariant } from '../_types';

export function getVariants(
  cls: Record<BaseVariant, string>,
  variant: BaseVariant,
) {
  const vars = {
    primary: cls.primary,
    secondary: cls.secondary,
    success: cls.success,
    warning: cls.warning,
    danger: cls.danger,
    info: cls.info,
    dark: cls.dark,
    light: cls.light,
  };
  return vars[variant];
}

export type ClassnamesArgs = string | string[] | Record<string, boolean>;

export function classnames(args: ClassnamesArgs): string {
  if (typeof args === 'string') {
    return args;
  } else if (args instanceof Array) {
    return args.join(' ');
  } else {
    const cls = [];
    for (const c in args) {
      if (args[c]) {
        cls.push(c);
      }
    }
    return cls.join(' ');
  }
}

export function niceBytes(x: number) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let l = 0,
    n = parseInt(x + '', 10) || 0;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + '' + units[l];
}
