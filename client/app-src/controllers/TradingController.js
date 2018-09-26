import { Tradings, TradingService, Trading } from '../domain/index.js';
import { TradingsView, MessageView, Message, InvalidDateException, DateConverter } from '../ui/index.js';
import { getTradingDao, Bind } from '../util/index.js';

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

  add(event) {
    try {
      event.preventDefault();

      const trading = this._createTrading();

      getTradingDao()
        .then(dao => dao.add(trading))
        .then(() => {
          this._tradings.add(trading);
          this._message.text = 'Trading added successfully';
          this._clearForm();
        })
        .catch(err => this._message.text = err);
    } catch (err) {
      if (err instanceof InvalidDateException) {
        this._message.text = err.message;
      } else {
        this._message.text = 'An unexpected error occurred';
      }
    }
  }

  removeAll(event) {
    getTradingDao()
      .then(dao => dao.removeAll())
      .then(() => {
        this._tradings.clear();
        this._message.text = 'Tradings removed successfully';
      })
      .catch(err => this._message.text = err);
  }

  importTradings() {
    this._service.getAllTradings()
      .then(tradings => {
        tradings
          .filter(newTrading => {
            return !this._tradings.toArray().some((existingTrading) => {
              return newTrading.equals(existingTrading);
            })
          })
          .forEach(trading => this._tradings.add(trading));
      })
      .catch(err => this._message.text = err);
  }

  _init() {
    getTradingDao()
      .then(dao => dao.listAll())
      .then(tradings =>
        tradings.forEach(trading =>
          this._tradings.add(trading)))
      .catch(err => this._message.text = err);
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
