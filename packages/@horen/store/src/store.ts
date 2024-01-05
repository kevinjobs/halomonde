import { useSyncExternalStore } from "react";

export type StoreSubscriber<T> = (value: T) => void;

type SetStateCallback<T> = (value: T) => T;

export interface Store<T> {
  getState: () => T;
  setState: (value: T | SetStateCallback<T>) => void;
  updateState: (value: T | SetStateCallback<T>) => void;
  initialize: (value: T) => void;
  subscribe: (callback: StoreSubscriber<T>) => () => void;
}

export type StoreValue<S extends Store<any>> = ReturnType<S['getState']>;

export function createStore<T extends Record<string, any>>(initialState: T): Store<T> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<StoreSubscriber<T>>();
  return {
    getState() {
      return state;
    },

    updateState(value) {
      state = typeof value === 'function' ? value(state) : value; 
    },

    setState(value) {
      this.updateState(value);
      listeners.forEach((listener) => listener(state));
    },

    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },

    subscribe(callback) {
      listeners.add(callback);
      // to unsubcribe the listener;
      return () => listeners.delete(callback);
    }
  }
}

export function useStore<S extends Store<any>>(store: S) {
  return useSyncExternalStore<StoreValue<S>>(
    store.subscribe,
    () => store.getState(),
    () => store.getState(),
  )
}
