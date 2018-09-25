System.register(['../../util/HttpService.js', './Trading.js'], function (_export, _context) {
  "use strict";

  var HttpService, Trading;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_TradingJs) {
      Trading = _TradingJs.Trading;
    }],
    execute: function () {
      class TradingService {
        constructor() {
          this._http = new HttpService();
        }

        getCurrentWeekTradings() {
          return this._http.get('trading/currentWeek').then(data => {
            const tradings = data.map(object => new Trading(new Date(object.date), object.amount, object.value));

            return tradings;
          }, err => {
            throw new Error('Could not get tradings from the current week');
          });
        }

        getPreviousWeekTradings() {
          return this._http.get('trading/previousWeek').then(data => data.map(object => new Trading(new Date(object.date), object.amount, object.value)), err => {
            throw new Error('Could not get tradings from the previous week');
          });
        }

        getDelayedWeekTradings() {
          return this._http.get('trading/delayedWeek').then(data => data.map(object => new Trading(new Date(object.date), object.amount, object.value)), err => {
            throw new Error('Could not get tradings from the delayed week');
          });
        }

        getAllTradings() {
          return Promise.all([this.getCurrentWeekTradings(), this.getPreviousWeekTradings(), this.getDelayedWeekTradings()]).then(periodTradings => periodTradings.reduce((newArray, item) => newArray.concat(item), []).sort((a, b) => b.date.getTime() - a.date.getTime())).catch(err => {
            throw new Error('Could not get tradings');
          });
        }

      }

      _export('TradingService', TradingService);
    }
  };
});
//# sourceMappingURL=TradingService.js.map