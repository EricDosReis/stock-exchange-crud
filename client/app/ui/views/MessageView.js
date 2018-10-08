System.register(['./View.js'], function (_export, _context) {
  "use strict";

  var View;
  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
    }],
    execute: function () {
      let MessageView = class MessageView extends View {
        template(model) {
          return model.text ? `<p class="alert alert-info">${model.text}</p>` : `<p></p>`;
        }
      };

      _export('MessageView', MessageView);
    }
  };
});
//# sourceMappingURL=MessageView.js.map