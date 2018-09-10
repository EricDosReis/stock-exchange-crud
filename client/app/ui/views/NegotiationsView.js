class NegotiationsView {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  update(model) {
    this._element.innerHTML = this.template(model);
  }

  template(model) {
    return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Value</th>
            <th>Volume</th>
          </tr>
        </thead>
        
        <tbody>
          ${model.toArray().map(negotiation =>
          `
            <tr>
              <td>${DateConverter.toString(negotiation.date)}</td>
              <td>${negotiation.amount}</td>
              <td>${negotiation.value}</td>
              <td align="right">${negotiation.volume}</td>
            </tr>
          `).join('')}
        </tbody>
        
        <tfoot>
          <tr>
            <td align="right" colspan="4">${model.totalVolume}</td>
          </tr>
        </tfoot>
      </table>
    `
  }
}
