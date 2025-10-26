export interface Category {
  id: number;
  name: string;
  key: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, name: "인기", key: "popular" },
  { id: 2, name: "치킨", key: "chicken" },
  { id: 3, name: "피자", key: "pizza" },
  { id: 4, name: "한식", key: "korean" },
  { id: 5, name: "중식", key: "chinese" },
  { id: 6, name: "양식", key: "western" },
  { id: 7, name: "일식", key: "japanese" },
  { id: 8, name: "분식", key: "bunsik" },
  { id: 9, name: "카페", key: "cafe" },
];

export const CATEGORY_CONSTANTS = {
  TITLE: "BEST",
} as const;
