const api = require('../api');

module.exports = (app) => {
  app.route('/trading/currentWeek')
    .get(api.currentWeek);
      
  app.route('/trading/previousWeek')
    .get(api.previousWeek);
      
  app.route('/trading/delayedWeek')
    .get(api.delayedWeek);  
      
  app.route('/trading')
    .post(api.newTrading);          
};
