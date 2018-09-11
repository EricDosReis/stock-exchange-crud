class NegotiationController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputAmount = $('#amount');
    this._inputValue = $('#value');
    this._negotiations = new Negotiations(model => {
      this._negotiationsView.update(model);
    });
    this._negotiationsView = new NegotiationsView('#negotiations');
    this._message = new Message();
    this._messageView = new MessageView('#message');
  }

  add(event) {
    event.preventDefault();

    this._negotiations.add(this._createNegotiation());
    this._message.text = 'Negotiation added successfully';
    this._messageView.update(this._message);
    this._clearForm();
  }

  removeAll(event) {
    this._negotiations.remove();
    this._message.text = 'Negotiations removed successfully';
    this._messageView.update(this._message);
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
