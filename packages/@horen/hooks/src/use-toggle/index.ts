import { useReducer } from 'react';
import { randomInt } from '../utils';

export type UseToggleSequence = 'forward' | 'reverse' | 'random';

export function useToggle<T = boolean>(
  values: readonly T[] = [false, true] as any,
  sequence: UseToggleSequence='forward'
) {
  // 使用 [value] 的方式可以取得数组的第一个元素
  const [[value], dispatch] = useReducer((state: T[], action: React.SetStateAction<T>) => {
    // 如果 action 为函数，则调用，并将其返回值赋值给 value
    const value = action instanceof Function ? action(state[0]) : action;
    // 找到当前值的位置
    let index: number;
    if (action !== undefined) index = Math.abs(state.indexOf(value));
    else {
      switch(sequence) {
        case 'reverse':
          index = state.length - 1;
          break;
        case 'random':
          index = randomInt(0, state.length);
          break;
        default:
          index = Math.abs(state.indexOf(value));
      }
    }
    // 重新裁切数组
    // console.log(state);
    return state.slice(index).concat(state.slice(0, index));
  }, values as T[]);

  return [value, dispatch as (value?: React.SetStateAction<T>) => void] as const;
}