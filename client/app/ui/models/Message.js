System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Message {
        constructor(text = '') {
          this._text = text;
        }

        get text() {
          return this._text;
        }

        set text(text) {
          return this._text = text;
        }
      }

      _export('Message', Message);
    }
  };
});
//# sourceMappingURL=Message.js.map