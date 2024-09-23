import React, { useState } from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import peopleFromServer from './people.json';
import { Filtering } from './components/Filtering';
import { PeopleTable } from './components/PeopleTable';
import { getVisiblePeople } from './utils/getVisiblePeople';

// const COLUMNS = ['name', 'sex', 'born', 'selection'];

export function App() {
  // FILTERING
  const [sexFilter, setSexFilter] = useState('all');
  const [nameFilter, setNameFilter] = useState('');
  const [sorting, setSorting] = useState({
    column: null,
    order: null,
  });

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

      <Filtering
        sexFilter={sexFilter}
        setSexFilter={setSexFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />

      <PeopleTable
        visiblePeople={visiblePeople}
        onSortingChange={handleSorting}
      />
    </div>
  );
}
