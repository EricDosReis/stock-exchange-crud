function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { HttpService } from '../../util/HttpService.js';
import { ApplicationException } from '../../util/ApplicationException.js';
import { Trading } from './Trading.js';

export let TradingService = class TradingService {
  constructor() {
    this._http = new HttpService();
  }

  getCurrentWeekTradings() {
    return this._http.get('http://localhost:3000/trading/currentWeek').then(data => {
      const tradings = data.map(object => new Trading(new Date(object.date), object.amount, object.value));

      return tradings;
    }, err => {
      throw new ApplicationException('Could not get tradings from the current week');
    });
  }

  getPreviousWeekTradings() {
    return this._http.get('http://localhost:3000trading/previousWeek').then(data => data.map(object => new Trading(new Date(object.date), object.amount, object.value)), err => {
      throw new ApplicationException('Could not get tradings from the previous week');
    });
  }

  getDelayedWeekTradings() {
    return this._http.get('http://localhost:3000trading/delayedWeek').then(data => data.map(object => new Trading(new Date(object.date), object.amount, object.value)), err => {
      throw new ApplicationException('Could not get tradings from the delayed week');
    });
  }

  getAllTradings() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        let tradingsFromPeriod = yield Promise.all([_this.getCurrentWeekTradings(), _this.getPreviousWeekTradings(), _this.getDelayedWeekTradings()]);

        return tradingsFromPeriod.reduce(function (newArray, item) {
          return newArray.concat(item);
        }, []).sort(function (a, b) {
          return b.date.getTime() - a.date.getTime();
        });
      } catch (err) {
        throw new ApplicationException('Could not get tradings');
      }
    })();
  }

};
//# sourceMappingURL=TradingService.js.map