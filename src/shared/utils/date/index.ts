/* eslint-disable import/no-duplicates */
import {
  add,
  format,
  isAfter,
  isBefore,
  isToday,
  isTomorrow,
  parse,
} from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
// eslint-disable-next-line import/no-duplicates
import { ptBR } from 'date-fns/locale';

type Duration = {
  years?: number | undefined;
  months?: number | undefined;
  weeks?: number | undefined;
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
};

const getOpeningHourTextByDayOfWeek = (dayOfWeek: number) => {
  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  if (dayOfWeek === 99) return 'Feriados';

  return days[dayOfWeek];
};

const getUtcOpeningHour = (time: string) => {
  const [hours, minutes, seconds] = time.split(':');

  const exampleDate = new Date();
  exampleDate.setUTCHours(Number(hours), Number(minutes), Number(seconds));
  const [, utcTimeWithSeconds] = exampleDate.toLocaleString().split(' ');
  const utcTimeWithoutSeconds = utcTimeWithSeconds.slice(0, 5);

  return utcTimeWithoutSeconds;
};

const getUtcOpeningHours = (openingTime: string, closingTime: string) =>
  `${getUtcOpeningHour(openingTime)} - ${getUtcOpeningHour(closingTime)}`;

const getUtcDate = (date: string | number | Date) =>
  zonedTimeToUtc(date, 'America/Sao_Paulo');

const formatDate = (date: number | Date | undefined) =>
  format(getUtcDate(date ?? ''), 'dd/MM/yyyy');

const parseDate = (dateString: string) =>
  parse(dateString, 'dd/MM/yyyy', new Date());

const isValidFullDate = (date: string) => {
  const [day, month, year] = date.split('/');

  return !!day && !!month && !!year;
};

const getDateByForm = (date: number | Date | undefined, form: string) =>
  format(getUtcDate(date ?? ''), form, { locale: ptBR });

const getExpectedTime = (date: Date) => {
  const time = format(getUtcDate(date), 'HH:mm');

  if (isToday(getUtcDate(date))) {
    return `Hoje às ${time}`;
  }
  if (isTomorrow(getUtcDate(date))) {
    return `Amanhã às ${time}`;
  }
  return `${format(getUtcDate(date), 'dd/MM')} às ${time}`;
};

const checkIfWithinDate = (date: Date, duration: Duration) => {
  const now = getUtcDate(new Date());
  const dateAfter24Hours = add(getUtcDate(date), duration);

  return isBefore(now, dateAfter24Hours);
};

const checkIfNowIsPastDate = (date: Date) => {
  const now = getUtcDate(new Date());

  return isAfter(now, getUtcDate(date));
};

export {
  formatDate,
  parseDate,
  isValidFullDate,
  getUtcOpeningHours,
  getDateByForm,
  getOpeningHourTextByDayOfWeek,
  getExpectedTime,
  checkIfWithinDate,
  checkIfNowIsPastDate,
};
