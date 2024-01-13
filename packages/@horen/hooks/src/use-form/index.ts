import React, { useReducer } from "react";

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
  onChange(e: FormItemChangeEvent | string, value: any): void;
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

function clearState<T extends Record<string, any>>(state: T):T {
  const tmp: any = {};
  for (const k of Object.keys(state)) {
    if (typeof state[k] === 'string') tmp[k] = '';
    if (typeof state[k] === 'number') tmp[k] = 0;
    if (typeof state[k] === 'boolean') tmp[k] = undefined;
    if (typeof state[k] === 'function') tmp[k] = undefined;
    if (typeof state[k] === 'symbol') tmp[k] = undefined;
    if (state[k] instanceof Array) tmp[k] = [];
  }
  return { ...state, ...tmp };
}

export function useForm({initial}: UseFormProps): UseFormReturnType {
  const reducer = (state: any, action: Action) => {
    if (action.type === 'clear') return clearState<typeof initial>(state);
    if (action.type === 'reset') return initial;
    return { ...state, ...action.payload };
  };

  const [state, dispatch] = useReducer(reducer, initial);

  const reset = () => dispatch({type: 'reset'});
  const clear = () => dispatch({type: 'clear'})

  const get = (prop: string, options?: GetOptions): GetReturn => {
    const type = options?.type || 'input';
    const onChange = (e: FormItemChangeEvent | string, value: any) => {
      if (typeof e === 'string') {
        dispatch({payload: {[String(e)]: value}});
      } else {
        if (type === 'input') {
          const target = e.target as HTMLInputElement;
          dispatch({payload: {[target.name]: value}});
        } else {
          const target = e.target as HTMLSpanElement;
          dispatch({
            payload: {
              [String(target.dataset['name'])]: value,
            }
          });
        }
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