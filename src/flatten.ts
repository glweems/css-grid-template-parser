import { Entry } from './types';

export default function flatten(entries: Entry[]): string {
  if (!entries) return '';
  return entries
    ?.map(({ amount, unit }) => {
      switch (unit) {
        case 'auto':
          return `${unit}`;
        default:
          return `${unit}${amount}`;
      }
    })
    .toString()
    .split(',')
    .join(' ');
}
