import React, { ReactElement, useState } from 'react';
import { Institution, Programme, LearningTypes } from 'types';
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
  ];
  const [isFullTime, setIsFullTime] = useState<Array<boolean>>([]);

  // Learning type
  const learningTypes = [
    {
      value: LearningTypes.DISTANT,
      label: 'Attālināti',
    },
    {
      value: LearningTypes.EXTRAMURAL,
      label: 'Pašmācība',
    },
    {
      value: LearningTypes.REAL_LIFE,
      label: 'Klātiene',
    },
  ];
  const [learnignTypesSelected, setLearnignTypesSelected] = useState<Array<LearningTypes>>([]);

  // Cost
  const allCosts = programmes ? programmes.map(
    (el) => ({ label: el.study_costs.toString(), value: el.study_costs }),
  ) : [];
  const [costSelected, setCostSelected] = useState<Array<number>>([]);

  // Durations
  const allDurations = programmes ? programmes.map(
    (el) => ({ label: el.duration_years.toString(), value: el.duration_years }),
  ) : [];
  const [durationSelected, setDurationSelected] = useState<Array<number>>([]);

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
            setActive={setIsFullTime}
          />
        </li>
        <li>
          Maksa
          <SimpleFilter
            options={allCosts}
            setActive={setCostSelected}
          />
        </li>
        <li>
          Klātiene / neklātiene
          <SimpleFilter
            options={learningTypes}
            setActive={setLearnignTypesSelected}
          />
        </li>
        <li>
          Ilgums
          <SimpleFilter
            options={allDurations}
            setActive={setDurationSelected}
          />
        </li>
      </ul>
    </div>
  );
}
