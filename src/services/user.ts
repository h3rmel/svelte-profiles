export async function searchUser(userName: string, config?: RequestInit) {
  return fetch(`https://api.github.com/users/${userName}`, config);
}

export async function searchUserRepos(userName: string, config?: RequestInit) {
  return fetch(`https://api.github.com/users/${userName}/repos`, config);
}
