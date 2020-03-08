export function login(data) {
  return {
    type: 'LOGIN',
    data,
  };
}

export function logout(person) {
  return {
    type: 'LOGOUT',
    person,
  };
}
