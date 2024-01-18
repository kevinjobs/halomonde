export type ClassnamesArgs = string | string[];

export function classnames(args: ClassnamesArgs): string {
  if (typeof args === 'string') {
    return args;
  } else {
    return args.join(' ');
  }
}
