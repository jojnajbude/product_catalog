import classNames from 'classnames';
import React, { useState } from 'react';

import './Filter.scss'

type Props = {
  title: string,
  optionsList: any[],
  selectedFilter: any,
  setFilter: React.Dispatch<React.SetStateAction<any>>,
};

export const Filter: React.FC<Props> = ({
  title,
  optionsList,
  selectedFilter,
  setFilter
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filter = optionsList
    .find(option => option === selectedFilter);

  return (
    <div className='filter'>
      <p className='filter__title'>
        {title}
      </p>
      <button
        className={classNames(
          'filter__value',
          {
            'filter__value--closed': !isOpen,
            'filter__value--open': isOpen,
          },
        )}
        onClick={() => {
          setIsOpen(curr => !curr);
        }}
      >
        {filter}
      </button>

      {isOpen && (
        <ul className='filter__options-list'>
          {optionsList.map(option => (
            <li
              className='filter__options-item'
              onClick={() => {
                setFilter(option);
                setIsOpen(curr => !curr);
              }}
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};