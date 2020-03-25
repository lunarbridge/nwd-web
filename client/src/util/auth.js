export const isAuthenticated = () => {
  return localStorage.getItem('currentUser') !== null;
}

export const fetchCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export const saveCurrentUser = ({ id, username, publicKey }) => {
  const currentUser = {
    id: id,
    username: username,
    publicKey: publicKey
  }

  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
