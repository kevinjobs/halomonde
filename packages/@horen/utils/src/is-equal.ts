/**
 * 判断两个对象是否完全相等
 * @param obj1 对象1
 * @param obj2 对象2
 * @returns 布尔值
 */
export function isEqual(obj1: any, obj2: any) {
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 !== 'object') return obj1 === obj2;
  const obj1Keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2keys.length) return false;
  for (let key of obj1Keys) {
    if (!isEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}
