class Negotiations {
  constructor() {
    this._negotiations = [];
  }

  add(negotiation) {
    this._negotiations.push(negotiation);
  }

  getNegotiations() {
    return [].concat(this._negotiations);
  }
}
