export class View {  
  constructor(selector) {
    this._element = document.querySelector(selector)
  }

  template(model) {
    throw new Error(`You need to implement the 'template' method`);
  }

  update(model) {
    this._element.innerHTML = this.template(model);
  }
}
