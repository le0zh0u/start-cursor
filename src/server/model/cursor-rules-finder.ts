export interface CursorRulesFinderItem {
  title: string;
  tags: string[];
  libs: string[];
  slug: string;
  content: string;
  author: CursorRulesFinderAuthor;
}

export interface CursorRulesFinderAuthor {
  name: string;
  url: string;
  avatar: string;
}
