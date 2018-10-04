import { debounce } from './util/index.js';
import { TradingController } from './controllers/TradingController.js';

const controller = new TradingController();
const $ = document.querySelector.bind(document);

$('.form')
  .addEventListener('submit', controller.add.bind(controller));

$('#btn-remove-all')
  .addEventListener('click', controller.removeAll.bind(controller));

$('#btn-import')
  .addEventListener('click', debounce(() =>
    controller.importTradings(), 1000));
