import React from "react";
import { useSetState } from '../use-set-state';

export interface UseFormProps {
  initial: any;
}

export type InputType = 'input' | 'checkbox' | 'select' | 'switch' | 'upload';
export type GetOptions = {
  type: InputType;
}
export type FormItemChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.MouseEvent<HTMLDivElement>
  | React.MouseEvent<HTMLSpanElement>;

export type GetReturn = {
  onChange(e: FormItemChangeEvent, value: any): void;
  value: any;
}
export type UseFormReturnType = {
  get(prop: string, options?: GetOptions): GetReturn;
  reset(): void;
  clear(): void;
  data: any;
}

interface Action {
  type?: string;
  payload?: any;
}

export function useForm({initial}: UseFormProps): UseFormReturnType {
  const [state, setValue] = useSetState<any>({...initial});

  console.log(state);

  const clear = () => {
    const tmp: any = {};
    for (const k of Object.keys(state)) {
      if (typeof state[k] === 'string') tmp[k] = '';
      if (typeof state[k] === 'number') tmp[k] = 0;
      if (typeof state[k] === 'boolean') tmp[k] = undefined;
      if (typeof state[k] === 'function') tmp[k] = undefined;
      if (typeof state[k] === 'symbol') tmp[k] = undefined;
      if (state[k] instanceof Array) tmp[k] = [];
    }
    setValue(tmp);
  }

  const reset = () => setValue(initial);;

  const get = (prop: string, options?: GetOptions): GetReturn => {
    const type = options?.type || 'input';
    const onChange = (e: FormItemChangeEvent, value: any) => {
      if (type === 'input') {
        const target = e.target as HTMLInputElement;
        setValue({[target.name]: value});
      } else {
        const target = e.target as HTMLSpanElement;
        setValue({
          [String(target.dataset['name'])]: value,
        });
      }
    }

    return {
      value: state[prop],
      onChange,
    }
  }

  return {
    get,
    reset,
    data: state,
    clear,
  }
}