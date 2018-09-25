System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class View {
        constructor(selector) {
          this._element = document.querySelector(selector);
        }

        template(model) {
          throw new Error(`You need to implement the 'template' method`);
        }

        update(model) {
          this._element.innerHTML = this.template(model);
        }
      }

      _export("View", View);
    }
  };
});
//# sourceMappingURL=View.js.map