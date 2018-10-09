export function required(param) {
  throw new Error(`${param} is required`);
}
