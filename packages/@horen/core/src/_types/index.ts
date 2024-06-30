export type BaseVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark';

export type BaseSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ComponentProps {
  variant?: BaseVariant;
}

export interface DataInputProps<Value = string> extends ComponentProps {
  name?: string;
  value?: Value;
  defaultValue?: Value;
}

export type OnChangeCallback<Event, Value = string> = (
  e: Event,
  value: Value,
) => void;
