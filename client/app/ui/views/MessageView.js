class MessageView extends View {
  template(model) {
    return `<p class="alert alert-info">${model.text}</p>`;
  }
}
