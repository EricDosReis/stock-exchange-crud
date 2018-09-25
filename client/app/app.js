System.register(['./controllers/TradingController.js'], function (_export, _context) {
  "use strict";

  var TradingController;
  return {
    setters: [function (_controllersTradingControllerJs) {
      TradingController = _controllersTradingControllerJs.TradingController;
    }],
    execute: function () {

      const controller = new TradingController();
      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', controller.add.bind(controller));

      $('#btn-remove-all').addEventListener('click', controller.removeAll.bind(controller));

      $('#btn-import').addEventListener('click', controller.importTradings.bind(controller));
    }
  };
});
//# sourceMappingURL=app.js.map