//TODO: Trocar fetch por axios
export async function searchUser(userName: string, config?: RequestInit) {
  return fetch(`https://api.github.com/users/${userName}`, config);
}

//TODO: Trocar fetch por axios
export async function searchUserLocal() {
  return fetch("http://localhost:3000/user");
}
