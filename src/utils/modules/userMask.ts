export function applyUserMask(user: GitHubUser): User {
  return {
    avatar_url: user.avatar_url,
    name: user.name,
    bio: user.bio,
    html_url: user.html_url,
    login: user.login,
    followers: user.followers,
    public_repos: user.public_repos,
    public_gists: user.public_gists,
  };
}
