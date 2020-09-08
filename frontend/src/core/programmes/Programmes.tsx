import React, { ReactElement, useEffect, useState } from 'react';
import { Programme } from 'types';
import { Requester } from 'utils/Requester';
import { Filters } from './Filters';
import { Grid } from './Grid';

export function Programmes(): ReactElement {
  const [allProgrammes, setAllProgrammes] = useState<Array<Programme>>([]);
  const [visibleProgrammes, setVisibleProgrammes] = useState<Array<Programme>>([]);

  useEffect(() => {
    async function getProgrammes(): Promise<void> {
      const resp: Array<Programme> = await Requester.getProgrammes('');
      setAllProgrammes(resp);
    }
    void getProgrammes();
  }, []);

  return (
    <>
      <Filters allProgrammes={allProgrammes} setVisibleProgrammes={setVisibleProgrammes} />
      <Grid />
    </>
  );
}
