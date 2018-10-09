import { required } from '../../util/index.js';

export class Trading {
  constructor(
    _date = required('date'),
    _amount = required('amount'),
    _value = required('value'),
  ) {
    Object.assign(this, { _amount, _value });
    this._date = new Date(_date.getTime());
    
    Object.freeze(this);
  }

  get volume() {
    return this._amount * this._value;
  }

  get date() {
    return new Date(this._date.getTime());
  }

  get amount() {
    return this._amount;
  }

  get value() {
    return this._value;
  }

  equals(trading) {
    return JSON.stringify(this) == JSON.stringify(trading);
  }
}
