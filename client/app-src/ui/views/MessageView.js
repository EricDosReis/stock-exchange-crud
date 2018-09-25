import { View } from './View.js';

export class MessageView extends View {
  template(model) {
    return model.text 
      ? `<p class="alert alert-info">${model.text}</p>`
      : `<p></p>`;
  }
}
