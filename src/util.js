import dayjs from 'dayjs';

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export function humanizeFilmsDueDate (dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

export const getTimeFromMin = (minutes) => `${Math.trunc(minutes / 60)}h ${minutes % 60}m`;

export const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';
