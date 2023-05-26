import { plural } from '../../utils';
import { dictionary } from './dictionary';

export const langOptions = [
  {
    title: 'Ru',
    value: 'ru',
  },
  {
    title: 'En',
    value: 'en',
  },
];

export function getLocaleText(component, key, locale, options) {
  if (options?.plural !== undefined) {
    return plural(options.plural, dictionary[locale][component][key], locale);
  }
  return dictionary[locale][component][key];
}
