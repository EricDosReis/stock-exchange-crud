import { HttpService } from '../../util/HttpService.js';
import { ApplicationException } from '../../util/ApplicationException.js';
import { Trading } from './Trading.js';

export class TradingService {
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
          throw new ApplicationException('Could not get tradings from the current week');
        }
      );
  }

  getPreviousWeekTradings() {
    return this._http
      .get('trading/previousWeek')
      .then(
        data =>
          data.map(object =>
            new Trading(new Date(object.date), object.amount, object.value))
        ,
        err => {
          throw new ApplicationException('Could not get tradings from the previous week');
        }
      );
  }

  getDelayedWeekTradings() {
    return this._http
      .get('trading/delayedWeek')
      .then(
        data => 
          data.map(object => 
            new Trading(new Date(object.date), object.amount, object.value))
        ,
        err => {
          throw new ApplicationException('Could not get tradings from the delayed week');
        }
      );
  }

  async getAllTradings() {
    try {
      let tradingsFromPeriod = await Promise.all([
        this.getCurrentWeekTradings(),
        this.getPreviousWeekTradings(),
        this.getDelayedWeekTradings(),
      ]);

      return tradingsFromPeriod
        .reduce((newArray, item) => newArray.concat(item), [])
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    } catch (err) {
      throw new ApplicationException('Could not get tradings');
    }
  }

}
