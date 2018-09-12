class Negotiations {
  constructor(trap) {
    this._negotiations = [];

    Object.freeze(this);
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
  }

  toArray() {
    return [].concat(this._negotiations);
  }

  remove() {
    this._negotiations.length = 0;
  }

  get totalVolume() {
    return this._negotiations.reduce((total, negotiation) => 
      total + negotiation.volume, 0);
  }
}
