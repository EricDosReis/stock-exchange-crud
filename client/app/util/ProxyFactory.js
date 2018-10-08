System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ProxyFactory = class ProxyFactory {
        constructor() {
          throw new Error('ProxyFactory class cannot be instantiated');
        }

        static create(object, props, trap) {
          return new Proxy(object, {
            get(target, prop, receiver) {
              if (ProxyFactory.isFunction(target[prop]) && props.includes(prop)) {
                return function () {
                  target[prop].apply(target, arguments);
                  trap(target);
                };
              } else {
                return target[prop];
              }
            },

            set(target, prop, value, receiver) {
              const updated = Reflect.set(target, prop, value);

              if (props.includes(prop)) {
                trap(target);
              }

              return updated;
            }
          });
        }

        static isFunction(prop) {
          return typeof prop == typeof Function;
        }
      };

      _export('ProxyFactory', ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map