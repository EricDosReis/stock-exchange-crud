class Tradings {
  constructor(trap) {
    this._tradings = [];

    Object.freeze(this);
  }

  add(trading) {
    this._tradings.push(trading);
  }

  toArray() {
    return [].concat(this._tradings);
  }

  clear() {
    this._tradings.length = 0;
  }

  get totalVolume() {
    return this._tradings.reduce((total, trading) => 
      total + trading.volume, 0);
  }
}
