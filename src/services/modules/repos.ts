//TODO: Trocar fetch por axios
export async function searchUserRepos(userName: string, config?: RequestInit) {
  return fetch(`https://api.github.com/users/${userName}/repos`, config);
}

//TODO: Trocar fetch por axios
export async function searchUserReposLocal() {
  return fetch("http://localhost:3000/repos");
}
