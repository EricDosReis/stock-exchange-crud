System.register(['./ConnectionFactory.js', '../domain/trading/TradingDao.js'], function (_export, _context) {
  "use strict";

  var ConnectionFactory, TradingDao;
  return {
    setters: [function (_ConnectionFactoryJs) {
      ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
    }, function (_domainTradingTradingDaoJs) {
      TradingDao = _domainTradingTradingDaoJs.TradingDao;
    }],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

      let getTradingDao = (() => {
        var _ref = _asyncToGenerator(function* () {
          let conn = yield ConnectionFactory.getConnection();

          return new TradingDao(conn);
        });

        return function getTradingDao() {
          return _ref.apply(this, arguments);
        };
      })();

      _export('getTradingDao', getTradingDao);
    }
  };
});
//# sourceMappingURL=DaoFactory.js.map