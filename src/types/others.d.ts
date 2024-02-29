interface GitHubErrorResponse {
  message: string;
  documentation_url: string;
}

interface FetchError {
  status: number;
  message: string;
}

type ViewType = "grid" | "list";
