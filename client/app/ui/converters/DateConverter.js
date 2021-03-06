System.register(['./InvalidDateException.js'], function (_export, _context) {
  "use strict";

  var InvalidDateException;
  return {
    setters: [function (_InvalidDateExceptionJs) {
      InvalidDateException = _InvalidDateExceptionJs.InvalidDateException;
    }],
    execute: function () {
      class DateConverter {
        constructor() {
          throw new Error('DateConverter class cannot be instantiated');
        }

        static toString(date) {
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        static toDate(dateString) {
          if (!/\d{2}\/\d{2}\/\d{4}/.test(dateString)) {
            throw new InvalidDateException();
          }

          return new Date(...dateString.split('/').reverse().map((item, i) => item - i % 2));
        }
      }

      _export('DateConverter', DateConverter);
    }
  };
});
//# sourceMappingURL=DateConverter.js.map