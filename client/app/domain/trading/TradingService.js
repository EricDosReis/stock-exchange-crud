class TradingService {
  constructor() {
    this._http = new HttpService();
  }

  getCurrentWeekTradings() {
    return this._http
      .get('trading/currentWeek')
      .then(
        data => {
          const tradings = data.map(object =>
            new Trading(new Date(object.date), object.amount, object.value));

          return tradings;
        },
        err => {
          throw new Error('Could not get tradings from the current week');
        }
      );
  }

  getPreviousWeekTradings() {
    return this._http
      .get('trading/previousWeek')
      .then(
        data => {
          const tradings = data.map(object =>
            new Trading(new Date(object.date), object.amount, object.value));

          return tradings;
        },
        err => {
          throw new Error('Could not get tradings from the previous week');
        }
      );
  }

  getDelayedWeekTradings() {
    return this._http
      .get('trading/delayedWeek')
      .then(
        data => {
          const tradings = data.map(object =>
            new Trading(new Date(object.date), object.amount, object.value));

          return tradings;
        },
        err => {
          throw new Error('Could not get tradings from the delayed week');
        }
      );
  }

}
