System.register(['./util/index.js', './controllers/TradingController.js'], function (_export, _context) {
  "use strict";

  var debounce, TradingController;
  return {
    setters: [function (_utilIndexJs) {
      debounce = _utilIndexJs.debounce;
    }, function (_controllersTradingControllerJs) {
      TradingController = _controllersTradingControllerJs.TradingController;
    }],
    execute: function () {

      const controller = new TradingController();
      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', controller.add.bind(controller));

      $('#btn-remove-all').addEventListener('click', controller.removeAll.bind(controller));

      $('#btn-import').addEventListener('click', debounce(() => controller.importTradings(), 1000));
    }
  };
});
//# sourceMappingURL=app.js.map