import React, { useReducer } from 'react';

export type ValidationValue = (value: any) => string;

export type Validation = Record<string, ValidationValue>;

export interface UseFormProps {
  initialValues: Record<string, any>;
  validation: Validation;
}

export type GetReturn = {
  onChange(e?: any, value?: any): void;
  onFocus(): void;
  onBlur(): void;
  value: any;
  defaultValue: any;
  error: string | null;
};

export type UseFormReturnType = {
  getProps(prop: string): GetReturn;
  /** reset values to initial values */
  reset(): void;
  /** clear all values */
  clear(): void;
  /** set input value */
  setValue(prop: string, value: any): void;
  /** set all input values */
  setValues(values: Record<string, any>): void;
  /** get input value */
  getValue(prop: string): any;
  /** get all input values */
  getValues(): any;
};

interface Action {
  type?: string;
  payload?: any;
}

function clearState<T extends Record<string, any>>(state: T): T {
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

export function useForm({
  initialValues,
  validation,
}: UseFormProps): UseFormReturnType {
  type ValueType = typeof initialValues;

  const reducer = (state: any, action: Action) => {
    if (action.type === 'clear') return clearState<ValueType>(state);
    if (action.type === 'reset') return initialValues;
    return { ...state, ...action.payload };
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  const reset = () => dispatch({ type: 'reset' });
  const clear = () => dispatch({ type: 'clear' });

  const getProps = (prop: string): GetReturn => {
    const onChange = (value: any) => {
      dispatch({ payload: { [prop]: value } });
    };

    const onFocus = () => {};

    const onBlur = () => {};

    return {
      onChange,
      onBlur,
      onFocus,
      value: state[prop],
      defaultValue: initialValues[prop],
      error: validation?.hasOwnProperty(prop)
        ? validation[prop]?.(state[prop])
        : null,
    };
  };

  const setState = (prop: string, value: any) => {
    dispatch({ payload: { [prop]: value } });
  };

  return {
    getProps,
    reset,
    clear,
    setValue: (key, value) => setState(key, value),
    setValues: (prev) => dispatch({ payload: prev }),
    getValue: (prop: string) => state[prop],
    getValues: () => state,
  };
}
