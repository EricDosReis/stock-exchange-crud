export function controller(...selectors) {
  const elements = selectors.map(selector => 
    document.querySelector(selector));

  return function(constructor) {
    const originalConstructor = constructor;

    const newConstructor = function() {
      return new originalConstructor(...elements);
    }

    newConstructor.prototype = originalConstructor.prototype;

    return newConstructor;
  }
}
