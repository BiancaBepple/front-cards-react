export default function person(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_PERSON':
      return [...state, action.person];

    case 'REMOVE_FROM_PERSON':
      return state.filter(item => item !== action.person);

    default:
      return state;
  }
}
