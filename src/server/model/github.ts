export interface GithubProjectAPIResponse {
  full_name: string;
  id: number;
  description: string;
  html_url: string;
  stargazers_count?: number;
  language?: string;
}

export interface GithubProjectInfo {
  name: string;
  slug: string;
  stars: number;
  description: string;
  url: string;
  cursorRuleUrl: string;
  cursorRule: string;
  language: string;
}
