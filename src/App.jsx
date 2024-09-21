/* eslint-disable function-paren-newline */
import React, { useState } from 'react';
import cn from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';

const COLUMNS = ['name', 'sex', 'born', 'selection'];

export function App() {
  const [selectedPeople, setSelectedPeople] = useState([]);

  const handleAddPerson = person => {
    setSelectedPeople(people => [...people, person]);
  };

  const handleRemovePerson = person =>
    setSelectedPeople(people =>
      people.filter(selectedPerson => selectedPerson !== person),
    );

  return (
    <div className="box">
      <h1 className="title">People table</h1>

      <div className="block">
        <div className="buttons has-addons">
          <button type="button" className="button is-info">
            all
          </button>
          <button type="button" className="button">
            m
          </button>
          <button type="button" className="button">
            f
          </button>
        </div>
        <input type="search" />
      </div>

      <button type="button" className="button is-link is-outlined is-fullwidth">
        Reset all filters
      </button>

      <table className="table is-striped is-narrow">
        <caption>
          {selectedPeople.map(person => person.name).join(', ')}
        </caption>

        <thead>
          <tr>
            {COLUMNS.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {peopleFromServer.map(person => {
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
    </div>
  );
}
