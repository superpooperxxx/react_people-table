export const getVisiblePeople = (
  people,
  { sexFilter, nameFilter, sorting },
) => {
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
