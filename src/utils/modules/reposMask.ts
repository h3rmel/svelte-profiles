export function applyRepoMask(
  repository: GitHubRepository,
  userLogin: string
): Repository | undefined {
  if (repository.name === userLogin) return;

  return {
    id: repository.id,
    node_id: repository.node_id,
    name: repository.name,
    html_url: repository.html_url,
    description: repository.description,
    homepage: repository.homepage,
    topics: repository.topics,
  };
}
