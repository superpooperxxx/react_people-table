/* eslint-disable function-paren-newline */
import React, { useState } from 'react';
import cn from 'classnames';

export const PeopleTable = ({ visiblePeople, onSortingChange }) => {
  const [selectedPeople, setSelectedPeople] = useState([]);

  const handleAddPerson = person => {
    setSelectedPeople(people => [...people, person]);
  };

  const handleRemovePerson = person =>
    setSelectedPeople(people =>
      people.filter(selectedPerson => selectedPerson !== person),
    );

  return visiblePeople.length ? (
    <table className="table is-striped is-narrow">
      <caption>{selectedPeople.map(person => person.name).join(', ')}</caption>

      <thead>
        <tr>
          <th onClick={() => onSortingChange('name')}>name</th>

          <th>sex</th>

          <th onClick={() => onSortingChange('born')}>born</th>

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
  );
};
