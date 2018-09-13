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
    try {
      event.preventDefault();

      this._negotiations.add(this._createNegotiation());
      this._message.text = 'Negotiation added successfully';
      this._clearForm();
    } catch (err) {
      if (err instanceof InvalidDateException) {
        this._message.text = err.message;
      } else {
        this._message.text = 'An unexpected error occurred';
      }
    }
  }

  removeAll(event) {
    this._negotiations.remove();
    this._message.text = 'Negotiations removed successfully';
  }

  importNegotiations() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'negociacoes/semana');

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          console.log('Get negotiations');
          console.log(JSON.parse(xhr.responseText));
        } else {
          console.log(xhr.responseText);
          console.log('Could not get week trading');
        }
      }
    };

    xhr.send();
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
