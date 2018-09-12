class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputAmount = $('#amount');
    this._inputValue = $('#value');

    this._negotiations = new Bind(
      new Negotiations(),
      new NegotiationsView('#negotiations'),
      'add', 
      'remove',
    );

    this._message = new Bind(
      new Message(),
      new MessageView('#message'),
      'text',
    );
  }

  add(event) {
    event.preventDefault();

    this._negotiations.add(this._createNegotiation());
    this._message.text = 'Negotiation added successfully';
    this._clearForm();
  }

  removeAll(event) {
    this._negotiations.remove();
    this._message.text = 'Negotiations removed successfully';
  }

  _createNegotiation() {
    return new Negotiation(
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
