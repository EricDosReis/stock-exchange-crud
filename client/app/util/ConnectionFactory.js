System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      const stores = ['tradings'];
      let connection = null;
      let close = null;

      let ConnectionFactory = class ConnectionFactory {
        constructor() {
          throw new Error('ConnectionFactory class cannot be instantiated');
        }

        static getConnection() {
          return new Promise((resolve, reject) => {
            if (connection) {
              return resolve(connection);
            }

            const openRequest = indexedDB.open('jscangaceiro', 2);

            openRequest.onupgradeneeded = e => {
              ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
              connection = e.target.result;

              close = connection.close.bind(connection);

              connection.close = () => {
                throw new Error('The connection cannot be closed directly');
              };

              resolve(connection);
            };

            openRequest.onerror = e => {
              reject(e.target.error.name);
            };
          });
        }

        static closeConnection() {
          if (connection) {
            close();
          }
        }

        static _createStores(connection) {
          stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
              connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
          });
        }
      };

      _export('ConnectionFactory', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map