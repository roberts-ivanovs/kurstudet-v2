import React, { ReactElement, useState } from 'react';
import { Institution, Programme } from 'types';
import { SimpleFilter } from 'core/programmes/filter/SimpleFilter';

export function Filters(): ReactElement {
  // Institutions
  const [institutions, setInstitutions] = useState<Array<Institution>>([]);
  const [institutionsSelected, setInstitutionsSelected] = useState<Array<Institution>>();

  // Programmes
  const [programmes, setProgrammes] = useState<Array<Programme>>([]);
  const [programmesSelected, setProgrammesSelected] = useState<Array<Programme>>();

  // Full time or not
  const fullTimeOptions = [
    {
      value: true,
      label: 'Pilna laika',
    },
    {
      value: false,
      label: 'Nepilna laika',
    },
  ]
  const [isFullTime, setisFullTime] = useState<Array<boolean>>([]);


  return (
    <div>
      <ul>
        <li>
          Institūcija
          <SimpleFilter
            options={institutions ? institutions?.map(
              (el) => ({ value: el, label: el.name })
            ) : []}
            setActive={setInstitutionsSelected}
          />
        </li>
        <li>
          Programmas
          <SimpleFilter
            options={programmes ? programmes?.map(
              (el) => ({ value: el, label: el.name })
            ) : []}
            setActive={setProgrammesSelected}
          />
        </li>
        <li>
          Pilna/nepilna laika
          <SimpleFilter
            options={fullTimeOptions}
            setActive={setisFullTime}
          />
        </li>
      </ul>
    </div>
  );
}
