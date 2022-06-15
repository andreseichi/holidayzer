import express from 'express';

const app = express();
const port = 8080;

const holidays = [
  { date: '1/1/2022', name: 'Confraternização mundial' },
  { date: '1/3/2022', name: 'Carnaval' },
  { date: '4/17/2022', name: 'Páscoa' },
  { date: '4/21/2022', name: 'Tiradentes' },
  { date: '5/1/2022', name: 'Dia do trabalho' },
  { date: '6/16/2022', name: 'Corpus Christi' },
  { date: '9/7/2022', name: 'Independência do Brasil' },
  { date: '10/12/2022', name: 'Nossa Senhora Aparecida' },
  { date: '11/2/2022', name: 'Finados' },
  { date: '11/15/2022', name: 'Proclamação da República' },
  { date: '12/25/2022', name: 'Natal' },
];

app.get('/holidays', (request, response) => {
  response.send(holidays);
});

app.get('/is-today-holiday', (request, response) => {
  const today = new Date().toLocaleDateString('en-US');
  const todayHoliday = holidays.filter((object) => object.date === today);

  if (todayHoliday.length > 0) {
    const { name } = todayHoliday[0];

    return response.send(`Sim, hoje é ${name}`);
  }

  return response.send('Não, hoje não é feriado');
});

app.get('/holidays/:month', (request, response) => {
  const { month } = request.params;

  const holidaysInMonthArray = holidays.filter((object) => {
    const monthIndex = (new Date(object.date).getMonth() + 1).toString();
    return monthIndex === month;
  });

  if (holidaysInMonthArray.length > 0) {
    return response.send(holidaysInMonthArray);
  }
  return response.send('Não há feriados nesse mês');
});

app.listen(port);
