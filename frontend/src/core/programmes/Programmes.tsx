import React, { ReactElement } from 'react';

interface Props {

}

export function Programmes({ }: Props): ReactElement {
  return (
    <>
      <Filters />
      <Grid />
    </>
  );
}
