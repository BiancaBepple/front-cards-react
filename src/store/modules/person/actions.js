export function addToPerson(person) {
  return {
    type: 'ADD_TO_PERSON',
    person,
  };
}

export function removeFromPerson(person) {
  return {
    type: 'REMOVE_FROM_PERSON',
    person,
  };
}
