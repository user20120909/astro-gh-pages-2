export const parseDate = (date: Date, includeYear = true) => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: includeYear ? 'numeric' : undefined,
  });
};
