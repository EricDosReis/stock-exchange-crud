class TradingService {
  getCurrentWeekTradings(callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'trading/currentWeek');

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          const tradings = JSON
            .parse(xhr.responseText)
            .map(object => {
              return new Trading(new Date(object.date), object.amount, object.value);
            });

          callback(null, tradings);
        } else {
          callback('Could not get tradings from this week');
        }
      }
    };

    xhr.send();
  }
}
