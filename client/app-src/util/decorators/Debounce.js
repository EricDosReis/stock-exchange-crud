export function debounce(milliseconds = 500) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;
    let timer = 0;

    descriptor.value = function(...args) {
      clearTimeout(timer);

      if (event) event.preventDefault();
      
      timer = setTimeout(() => originalMethod.apply(this, args), milliseconds);
    }

    return descriptor;
  }
}
