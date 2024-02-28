export function searchUser(userName: string, config?: RequestInit) {
  return fetch(`https://api.github.com/users/${userName}`, config);
}
