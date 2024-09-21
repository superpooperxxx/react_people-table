/* eslint-disable function-paren-newline */
import React, { useState } from 'react';
import cn from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

// const COLUMNS = ['name', 'sex', 'born', 'selection'];
const SEX_VALUES = ['all', 'm', 'f'];
const SEX_DEFAULT_VALUE = 'all';

const getVisiblePeople = (people, { sexFilter, nameFilter, sorting }) => {
  let filteredPeople = [...people];

  if (sexFilter !== 'all') {
    filteredPeople = filteredPeople.filter(person => person.sex === sexFilter);
  }

  const normalizedNameFilter = nameFilter.toLowerCase().trim();

  if (normalizedNameFilter) {
    filteredPeople = filteredPeople.filter(person => {
      const normalizedName = person.name.toLowerCase().trim();

      return normalizedName.includes(normalizedNameFilter);
    });
  }

  if (sorting.column) {
    filteredPeople.sort((currentPerson, nextPerson) => {
      const currentValue = currentPerson[sorting.column];
      const nextValue = nextPerson[sorting.column];
      let comparison = 0;

      if (typeof currentValue === 'string') {
        comparison = currentValue.localeCompare(nextValue);
      } else {
        comparison = currentValue - nextValue;
      }

      // Якщо напрямок сортування спадаючий, то нам достатньо помножити на -1 значення порівняння
      return sorting.order === 'asc' ? comparison : comparison * -1;
    });
  }

  // РІШЕННЯ В ЛОБ
  // if (sorting.column) {
  //   filteredPeople.sort((currentPerson, nextPerson) => {
  //     const currentValue = currentPerson[sorting.column];
  //     const nextValue = nextPerson[sorting.column];

  //     if (typeof currentValue === 'string') {
  //       if (sorting.order === 'asc') {
  //         return currentValue.localeCompare(nextValue);
  //       }

  //       return nextValue.localeCompare(currentValue);
  //     }

  //     if (sorting.order === 'asc') {
  //       return currentValue - nextValue;
  //     }

  //     return nextValue - currentValue;
  //   });
  // }

  return filteredPeople;
};

export function App() {
  const [selectedPeople, setSelectedPeople] = useState([]);

  // FILTERING
  const [sexFilter, setSexFilter] = useState(SEX_DEFAULT_VALUE);
  const [nameFilter, setNameFilter] = useState('');
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

  const handleAddPerson = person => {
    setSelectedPeople(people => [...people, person]);
  };

  const handleRemovePerson = person =>
    setSelectedPeople(people =>
      people.filter(selectedPerson => selectedPerson !== person),
    );

  const handleResetFilters = () => {
    setSexFilter(SEX_DEFAULT_VALUE);
    setNameFilter('');
  };

  const handleSorting = column => {
    // 1. Встановлюємо колонку + order = 'asc'
    // 2. Дивимось на order, якщо asc, то des
    // 3. Якщо order = 'des', то column = null, order = null
    const isColumnSelected = sorting.column === column;

    if (!isColumnSelected) {
      setSorting({
        column,
        order: 'asc',
      });
    }

    if (isColumnSelected && sorting.order === 'asc') {
      setSorting({
        column,
        order: 'des',
      });
    }

    if (isColumnSelected && sorting.order === 'des') {
      setSorting({
        column: null,
        order: null,
      });
    }
  };

  const visiblePeople = getVisiblePeople(peopleFromServer, {
    sexFilter,
    nameFilter,
    sorting,
  });

  return (
    <div className="box">
      <h1 className="title">People table</h1>

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

      <button
        type="button"
        className="button is-link is-outlined is-fullwidth"
        onClick={handleResetFilters}
      >
        Reset all filters
      </button>

      {visiblePeople.length ? (
        <table className="table is-striped is-narrow">
          <caption>
            {selectedPeople.map(person => person.name).join(', ')}
          </caption>

          <thead>
            <tr>
              <th onClick={() => handleSorting('name')}>name</th>

              <th>sex</th>

              <th onClick={() => handleSorting('born')}>born</th>

              <th>selection</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeople.map(person => {
              const isSelected = selectedPeople.includes(person);

              return (
                <tr
                  key={person.slug}
                  className={cn({
                    'has-background-link': person.sex === 'm' && !isSelected,
                    'has-background-danger': person.sex === 'f' && !isSelected,
                    'has-background-warning': isSelected,
                  })}
                >
                  <td>{person.name}</td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>

                  <td>
                    {isSelected ? (
                      <button
                        type="button"
                        onClick={() => handleRemovePerson(person)}
                        className="button has-background-danger"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddPerson(person)}
                        className="button"
                      >
                        <i className="fas fa-plus" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No people found</p>
      )}
    </div>
  );
}
