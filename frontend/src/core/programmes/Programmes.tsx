import React, { ReactElement } from 'react';
import { Filters } from "./Filters";
import { Grid } from "./Grid";

export function Programmes(): ReactElement {
  return (
    <>
      <Filters />
      <Grid />
    </>
  );
}
