class TradingController {
  constructor() {
    const $ = document.querySelector.bind(document);

    this._inputDate = $('#date');
    this._inputAmount = $('#amount');
    this._inputValue = $('#value');

    this._tradings = new Bind(
      new Tradings(),
      new TradingsView('#tradings'),
      'add', 
      'remove',
    );

    this._message = new Bind(
      new Message(),
      new MessageView('#message'),
      'text',
    );

    this._service = new TradingService();
  }

  add(event) {
    try {
      event.preventDefault();

      const trading = this._createTrading();

      DaoFactory
        .getTradingDao()
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
    this._tradings.remove();
    this._message.text = 'Tradings removed successfully';
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
