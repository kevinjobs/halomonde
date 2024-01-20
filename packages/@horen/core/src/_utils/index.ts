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

export type ClassnamesArgs = string | string[];

export function classnames(args: ClassnamesArgs): string {
  if (typeof args === 'string') {
    return args;
  } else {
    return args.join(' ');
  }
}
