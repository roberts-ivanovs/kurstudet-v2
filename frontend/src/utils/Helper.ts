import { FilterOptions } from 'types';

export function distinct<T>(iterable: Array<FilterOptions<T>>): Array<FilterOptions<T>> {
  const filteredLabels: Array<string> = [];

  return iterable.filter((n, i) => {
    if (filteredLabels.indexOf(n.label) === -1) {
      filteredLabels.push(n.label);
      return true;
    }
    return false;
  });
}
