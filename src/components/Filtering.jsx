import React from 'react';
import cn from 'classnames';
import { Button } from '../UI/Button';

const SEX_VALUES = ['all', 'm', 'f'];

export const Filtering = ({
  sexFilter,
  setSexFilter,
  nameFilter,
  setNameFilter,
}) => {
  const handleResetFilters = () => {
    setSexFilter('all');
    setNameFilter('');
  };

  return (
    <>
      <div className="block">
        <div className="buttons has-addons">
          {SEX_VALUES.map(value => (
            <button
              key={value}
              type="button"
              className={cn('button', {
                'is-info': sexFilter === value,
              })}
              onClick={() => setSexFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <label>
          Enter the name
          <input
            type="search"
            value={nameFilter}
            onChange={event => {
              setNameFilter(event.target.value.trimStart());
            }}
          />
        </label>
      </div>

      <Button onClick={handleResetFilters}>Reset all filters</Button>
    </>
  );
};
