import React, { ReactElement, useState } from 'react';
import { Institution, Programme, LearningTypes } from 'types';
import { SimpleFilter } from 'core/programmes/filter/SimpleFilter';
import { distinct } from 'utils/Helper';

interface Props {
  allProgrammes: Array<Programme>,
  setVisibleProgrammes: (arg0: Array<Programme>) => void,
}

export function Filters({ allProgrammes, setVisibleProgrammes }: Props): ReactElement {
  // Institutions
  const [institutions, setInstitutions] = useState<Array<Institution>>([]);
  const [institutionsSelected, setInstitutionsSelected] = useState<Array<Institution>>();

  // Programmes
  const filterProgrammes = distinct(allProgrammes.map(
    (el) => ({ value: el, label: el.name }),
  ));

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
  const allCosts = distinct(allProgrammes.map(
    (el) => ({ label: el.study_costs.toString(), value: el.study_costs }),
  ));
  console.log(allCosts);

  const [costSelected, setCostSelected] = useState<Array<number>>([]);

  // Durations
  const allDurations = distinct(allProgrammes.map(
    (el) => ({ label: el.duration_years.toString(), value: el.duration_years }),
  ));
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
            options={filterProgrammes}
            setActive={setVisibleProgrammes}
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
