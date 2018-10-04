export function debounce(fn, milliseconds) {
  let timer = 0;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(fn, milliseconds);
  }
}
