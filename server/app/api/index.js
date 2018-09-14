const api = {};
const currentDate = new Date();

const previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 7);

const delayedDate = new Date();
delayedDate.setDate(currentDate.getDate() - 14);

const tradings = [
  { date: currentDate, amount: 1, value: 150 },
  { date: currentDate, amount: 2, value: 250 },
  { date: currentDate, amount: 3, value: 350 },
  { date: previousDate, amount: 1, value: 450 },
  { date: previousDate, amount: 2, value: 550 },
  { date: previousDate, amount: 3, value: 650 },
  { date: previousDate, amount: 4, value: 300 },
  { date: delayedDate, amount: 1, value: 750 },
  { date: delayedDate, amount: 2, value: 950 },
  { date: delayedDate, amount: 3, value: 950 },
  { date: delayedDate, amount: 1, value: 350 },
  { date: delayedDate, amount: 2, value: 300 },
];

api.currentWeek = (req, res) => {
  const currentTradings = tradings.filter((trading) => {
    return trading.date > previousDate;
  });

  res.json(currentTradings);
};

api.previousWeek = (req, res) => {
  const previousWeekTradings = tradings.filter((trading) => {
    return trading.date < currentDate && trading.date > delayedDate;
  });
  
  setTimeout(() => {
    res.json(previousWeekTradings);	
	}, 500);
};

api.delayedWeek = (req, res) => {
  const delayedWeekTradings = tradings.filter((trading) => {
    return trading.date < previousDate;
  });
  
  res.json(delayedWeekTradings);
};

api.newTrading = (req, res) => {
  req.body.date = new Date(req.body.date.replace(/-/g,'/'));

  tradings.push(req.body);
  res.status(200).json('Trading received');
};

module.exports = api;
