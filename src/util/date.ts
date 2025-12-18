export const parseDate = (date: Date, includeYear = true) => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: includeYear ? 'numeric' : undefined,
  });
};

export const parseDateInt = (dateInt: number, includeYear = true) => {
  const date = new Date();
  const year = Math.floor(dateInt / 10000);
  const month = Math.floor((dateInt % 10000) / 100) - 1;
  const day = dateInt % 100;
  date.setFullYear(year, month, day);
  return parseDate(date, includeYear);
};
