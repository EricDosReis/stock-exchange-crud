import { Tradings, TradingService, Trading } from '../domain/index.js';
import { TradingsView, MessageView, Message, InvalidDateException, DateConverter } from '../ui/index.js';
import { getTradingDao, Bind, getExceptionMessage } from '../util/index.js';

export class TradingController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputAmount = $('#amount');
    this._inputValue = $('#value');

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

    this._service = new TradingService();
    this._init();
  }

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

  async importTradings() {
    try {
      const tradings = await this._service.getAllTradings();

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

      tradings.forEach(trading => this._tradings.add(trading))
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
