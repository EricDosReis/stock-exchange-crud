import { View } from './View.js';
import { DateConverter } from '../converters/DateConverter.js';

export class TradingsView extends View {
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
          ${model.toArray().map(trading =>
          `
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
    `
  }
}
