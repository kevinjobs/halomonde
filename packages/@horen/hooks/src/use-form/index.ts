import React, { FormEvent, useReducer } from 'react';

export type ValidationValue = (value: any) => string;

export type Validation = Record<string, ValidationValue>;

export type FormValues = Validation;

export interface UseFormProps {
  initialValues: Record<string, any>;
  validation: Validation;
  validateOnChange?: boolean;
}

export type GetReturn = {
  onChange(e?: any, value?: any): void;
  onFocus(): void;
  onBlur(): void;
  value: any;
  defaultValue?: any;
  error?: string | null;
};

export type FormData = {
  values: FormValues;
  validation: Validation;
};

export type SubmitCallback = (
  formData: FormData,
  evt?: FormEvent<HTMLFormElement>,
) => void;

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
  /** handle submit */
  onSubmit(cb: SubmitCallback): (evt: FormEvent<HTMLFormElement>) => void;
  /** validate all fields */
  validate(): void;
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
  validateOnChange,
}: UseFormProps): UseFormReturnType {
  type RealValuesType = typeof initialValues;

  const reducer = (state: any, action: Action) => {
    if (action.type === 'clear') {
      return {
        ...state,
        values: { ...state.values, ...clearState<RealValuesType>(state) },
      };
    }

    if (action.type === 'reset') {
      return {
        ...state,
        values: { ...state.values, ...initialValues },
      };
    }

    if (action.type === 'setValue') {
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    }

    if (action.type === 'setError') {
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    }

    return {
      values: { ...state.values, ...action.payload.values },
      errors: { ...state.errors, ...action.payload.errors },
    };
  };

  const [state, dispatch] = useReducer(reducer, {
    values: initialValues,
    errors: {},
  });

  const reset = () => dispatch({ type: 'reset' });
  const clear = () => dispatch({ type: 'clear' });

  const getProps = (prop: string): GetReturn => {
    const onChange = (value: any) => {
      let error = null;
      if (validateOnChange) {
        error = validation[prop]?.(value);
      }
      dispatch({
        payload: {
          values: { [prop]: value },
          errors: { [prop]: error },
        },
      });
    };

    const onFocus = () => {};

    const onBlur = () => {};

    return {
      onChange,
      onBlur,
      onFocus,
      value: state.values[prop] || '',
      // defaultValue: initialValues[prop],
      error: state.errors[prop],
    };
  };

  const setValue = (key: string, value: any) => {
    dispatch({ type: 'setValue', payload: { [key]: value } });
  };

  const setValues = (callback: (prev: RealValuesType) => RealValuesType) => {
    dispatch({ type: 'setValue', payload: callback(state) });
  };

  const getValue = (prop: string) => {
    return state[prop];
  };

  const getValues = () => state.values;

  const onSubmit =
    (cb: SubmitCallback) => (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const errors = validate();
      cb({ ...state, errors }, evt);
    };

  const validate = () => {
    const errors: Record<string, any> = {};
    for (const key of Object.keys(validation)) {
      const err = validation[key](state.values[key]);
      err ? (errors[key] = err) : delete errors[key];
    }
    dispatch({ type: 'setError', payload: errors });
    return errors;
  };

  return {
    getProps,
    reset,
    clear,
    setValue,
    setValues,
    getValue,
    getValues,
    onSubmit,
    validate,
  };
}
