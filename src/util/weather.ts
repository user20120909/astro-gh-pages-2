export const getIcon = (img: string) => {
  switch (img) {
    case '01d':
      return '☀️';
    case '02d':
      return '⛅';
    case '03d':
      return '🌥️';
    case '04d':
      return '☁️';
    case '09d':
      return '🌧️';
    case '10d':
      return '🌦️';
    case '11d':
      return '⛈️';
    case '13d':
      return '❄️';
    case '50d':
      return '🌫️';
    default:
      return '💥';
  }
};
