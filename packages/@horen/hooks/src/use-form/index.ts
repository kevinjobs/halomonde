import React, { useReducer } from "react";

export interface UseFormProps {
  initial: any;
}

export type GetReturn = {
  onChange(e?: any, value?: any): void;
  value: any;
}
export type UseFormReturnType = {
  get(prop: string): GetReturn;
  reset(): void;
  clear(): void;
  setState(prop: string, value: any): void;
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

  const get = (prop: string): GetReturn => {
    const onChange = (e: any, value?: any) => {
      dispatch({payload: {[prop]: value}});
    }

    return {
      value: state[prop],
      onChange,
    }
  }

  const setState = (prop: string, value: any) => {
    dispatch({payload: {[prop]: value}});
  }

  return {
    get,
    reset,
    data: state,
    clear,
    setState,
  }
}