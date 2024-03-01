import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export async function searchUser(
  userName: string,
  config?: AxiosRequestConfig
): Promise<GitHubUser> {
  return axios
    .get(`https://api.github.com/users/${userName}`, config)
    .then((response) => response.data);
}

export async function searchUserLocal(
  config?: AxiosRequestConfig
): Promise<GitHubUser> {
  return axios
    .get("http://localhost:3000/user", config)
    .then((response) => response.data);
}
