export interface Category {
  id: number;
  name: string;
  key: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, name: "인기", key: "popular" },
  { id: 2, name: "가전제품", key: "digital" },
  { id: 3, name: "의류", key: "clothing" },
];

export const CATEGORY_CONSTANTS = {
  TITLE: "BEST",
} as const;
