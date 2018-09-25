System.register(['./Trading.js'], function (_export, _context) {
  "use strict";

  var Trading;
  return {
    setters: [function (_TradingJs) {
      Trading = _TradingJs.Trading;
    }],
    execute: function () {
      class TradingDao {
        constructor(connection) {
          this._connection = connection;
          this._store = 'tradings';
        }

        add(trading) {
          return new Promise((resolve, reject) => {
            const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(trading);

            request.onsuccess = e => resolve();

            request.onerror = e => {
              console.error(e.target.error);
              reject('Could not possible save the trading');
            };
          });
        }

        listAll() {
          return new Promise((resolve, reject) => {
            const tradings = [];

            const cursor = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();

            cursor.onsuccess = e => {
              const data = e.target.result;

              if (data) {
                const trading = new Trading(data.value._date, data.value._amount, data.value._value);

                tradings.push(trading);
                data.continue();
              } else {
                resolve(tradings);
              }
            };

            cursor.onerror = e => {
              console.error(e.target.error);
              reject('Could not possible save the trading');
            };
          });
        }

        removeAll() {
          return new Promise((resolve, reject) => {
            const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();

            request.onsuccess = e => resolve();

            request.onerror = e => {
              console.error(e.target.error);
              reject('Could not possible remove all tradings');
            };
          });
        }
      }

      _export('TradingDao', TradingDao);
    }
  };
});
//# sourceMappingURL=TradingDao.js.map