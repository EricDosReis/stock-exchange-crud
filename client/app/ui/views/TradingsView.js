System.register(['./View.js', '../converters/DateConverter.js'], function (_export, _context) {
  "use strict";

  var View, DateConverter;
  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
    }, function (_convertersDateConverterJs) {
      DateConverter = _convertersDateConverterJs.DateConverter;
    }],
    execute: function () {
      class TradingsView extends View {
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
          ${model.toArray().map(trading => `
            <tr>
              <td>${DateConverter.toString(trading.date)}</td>
              <td>${trading.amount}</td>
              <td>${trading.value}</td>
              <td align="right">${trading.volume}</td>
            </tr>
          `).join('')}
        </tbody>
        
        <tfoot>
          <tr>
            <td align="right" colspan="4">${model.totalVolume}</td>
          </tr>
        </tfoot>
      </table>
    `;
        }
      }

      _export('TradingsView', TradingsView);
    }
  };
});
//# sourceMappingURL=TradingsView.js.map