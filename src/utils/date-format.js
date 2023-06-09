export default function (str, locale = 'ru') {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour12: false,
  }).format(new Date(str));
}
