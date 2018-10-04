System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
  "use strict";

  var Tradings, TradingService, Trading, TradingsView, MessageView, Message, InvalidDateException, DateConverter, getTradingDao, Bind, getExceptionMessage;

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

  return {
    setters: [function (_domainIndexJs) {
      Tradings = _domainIndexJs.Tradings;
      TradingService = _domainIndexJs.TradingService;
      Trading = _domainIndexJs.Trading;
    }, function (_uiIndexJs) {
      TradingsView = _uiIndexJs.TradingsView;
      MessageView = _uiIndexJs.MessageView;
      Message = _uiIndexJs.Message;
      InvalidDateException = _uiIndexJs.InvalidDateException;
      DateConverter = _uiIndexJs.DateConverter;
    }, function (_utilIndexJs) {
      getTradingDao = _utilIndexJs.getTradingDao;
      Bind = _utilIndexJs.Bind;
      getExceptionMessage = _utilIndexJs.getExceptionMessage;
    }],
    execute: function () {
      class TradingController {
        constructor() {
          const $ = document.querySelector.bind(document);

          this._inputDate = $('#date');
          this._inputAmount = $('#amount');
          this._inputValue = $('#value');

          this._tradings = new Bind(new Tradings(), new TradingsView('#tradings'), 'add', 'clear');

          this._message = new Bind(new Message(), new MessageView('#message'), 'text');

          this._service = new TradingService();
          this._init();
        }

        add(event) {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              event.preventDefault();

              const trading = _this._createTrading();

              const dao = yield getTradingDao();
              yield dao.add(trading);

              _this._tradings.add(trading);
              _this._message.text = 'Trading added successfully';
              _this._clearForm();
            } catch (err) {
              _this._message.text = getExceptionMessage(err);
            }
          })();
        }

        removeAll() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getTradingDao();
              yield dao.removeAll();

              _this2._tradings.clear();
              _this2._message.text = 'Tradings removed successfully';
            } catch (err) {
              _this2._message.text = getExceptionMessage(err);
            }
          })();
        }

        importTradings() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              const tradings = yield _this3._service.getAllTradings();

              tradings.filter(function (newTrading) {
                return !_this3._tradings.toArray().some(function (existingTrading) {
                  return newTrading.equals(existingTrading);
                });
              }).forEach(function (trading) {
                return _this3._tradings.add(trading);
              });
            } catch (err) {
              _this3._message.text = getExceptionMessage(err);
            }
          })();
        }

        _init() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getTradingDao();
              const tradings = yield dao.listAll();

              tradings.forEach(function (trading) {
                return _this4._tradings.add(trading);
              });
            } catch (err) {
              _this4._message.text = getExceptionMessage(err);
            }
          })();
        }

        _createTrading() {
          return new Trading(DateConverter.toDate(this._inputDate.value), parseInt(this._inputAmount.value), parseFloat(this._inputValue.value));
        }

        _clearForm() {
          this._inputDate.value = '';
          this._inputAmount.value = 1;
          this._inputValue.value = 0.0;
          this._inputDate.focus();
        }
      }

      _export('TradingController', TradingController);
    }
  };
});
//# sourceMappingURL=TradingController.js.map