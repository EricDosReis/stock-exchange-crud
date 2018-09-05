class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputAmount = $('#amount');
    this._inputValue = $('#value');
  }

  add(event) {
    event.preventDefault();

    const date = new Date(this._inputDate.value.replace(/-/, ','));
    const amount = parseInt(this._inputAmount.value);
    const value = parseFloat(this._inputValue.value);

    const newNegotiation = new Negotiation(date, amount, value);

    console.log(newNegotiation);
  }
}
