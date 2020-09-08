import React, { ReactElement } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FilterOptions } from 'types';

interface Props<T> {
  options: Array<FilterOptions<T>>,
  setActive: (arg0: Array<T>) => void,
}

const animatedComponents = makeAnimated();

export function SimpleFilter<T>({ options, setActive }: Props<T>): ReactElement {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      onChange={(arg0) => {
        if (arg0) {
          setActive(arg0 as Array<T>);
        }
      }}
    />
  );
}
