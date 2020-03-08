export default function user(state = [], action) {
  switch (action.type) {
    case 'LOGIN':
      return [...state, action.data];

    case 'LOGOUT':
      return state;

    default:
      return state;
  }
}
