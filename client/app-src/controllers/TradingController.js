import { Tradings, Trading } from '../domain';

import { 
  TradingsView, 
  MessageView, 
  Message, 
  DateConverter 
} from '../ui';

import { 
  getTradingDao, 
  Bind, 
  getExceptionMessage, 
  debounce, 
  controller, 
  bindEvent,
} from '../util';

@controller('#date', '#amount', '#value')
export class TradingController {
  constructor(_inputDate, _inputAmount, _inputValue) {
    const $ = document.querySelector.bind(document);

    Object.assign(this, { _inputDate, _inputAmount, _inputValue });

    this._tradings = new Bind(
      new Tradings(),
      new TradingsView('#tradings'),
      'add', 
      'clear',
    );

    this._message = new Bind(
      new Message(),
      new MessageView('#message'),
      'text',
    );

    this._init();
  }

  @bindEvent('submit', '.form')
  @debounce()
  async add(event) {
    try {
      event.preventDefault();

      const trading = this._createTrading();

      const dao = await getTradingDao();
      await dao.add(trading);

      this._tradings.add(trading);
      this._message.text = 'Trading added successfully';
      this._clearForm();
    } catch (err) {
      this._message.text = getExceptionMessage(err);
    }
  }

  @bindEvent('click', '#btn-remove-all')
  async removeAll() {
    try {
      const dao = await getTradingDao();
      await dao.removeAll();

      this._tradings.clear();
      this._message.text = 'Tradings removed successfully';
    } catch (err) {
      this._message.text = getExceptionMessage(err);
    }
  }

  @bindEvent('click', '#btn-import')
  @debounce(1500)
  async importTradings() {
    try {
      const { TradingService } = await import('../domain/trading/TradingService');

      const service = new TradingService;
      const tradings = await service.getAllTradings();

      tradings
        .filter(newTrading => {
          return !this._tradings.toArray().some((existingTrading) => {
            return newTrading.equals(existingTrading);
          })
        })
        .forEach(trading => this._tradings.add(trading));
    } catch (err) {
      this._message.text = getExceptionMessage(err);
    }
  }

  async _init() {
    try {
      const dao = await getTradingDao();
      const tradings = await dao.listAll();

      tradings.forEach(trading => this._tradings.add(trading));
    } catch (err) {
      this._message.text = getExceptionMessage(err);
    }
  }

  _createTrading() {
    return new Trading(
      DateConverter.toDate(this._inputDate.value),
      parseInt(this._inputAmount.value),
      parseFloat(this._inputValue.value),
    );
  }

  _clearForm() {
    this._inputDate.value = '';
    this._inputAmount.value = 1;
    this._inputValue.value = 0.0;
    this._inputDate.focus();
  }
}
