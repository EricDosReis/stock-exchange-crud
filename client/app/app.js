const controller = new NegotiationController();

document
  .querySelector('.form')
  .addEventListener('submit', controller.add.bind(controller));

document
  .querySelector('#btn-remove-all')
  .addEventListener('click', controller.removeAll.bind(controller));
