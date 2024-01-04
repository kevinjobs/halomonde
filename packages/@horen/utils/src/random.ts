export function randomInt(min: number, max: number) {
  return parseInt(String(Math.random()*(max-min+1)+min),10);
}
