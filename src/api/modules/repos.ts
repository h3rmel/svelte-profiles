import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export async function searchUserRepos(
  userName: string,
  config?: AxiosRequestConfig
): Promise<GitHubRepository[]> {
  return axios
    .get(`https://api.github.com/users/${userName}/repos`, config)
    .then((response) => response.data);
}

export async function searchUserReposLocal(
  config?: AxiosRequestConfig
): Promise<GitHubRepository[]> {
  return axios
    .get("http://localhost:3000/repos", config)
    .then((response) => response.data);
}
