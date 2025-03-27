export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const DEFAULT_AVATAR = "/images/default-avatar.png";

export const CONTENT_CATEGORIES: ReadonlyArray<string> = [
  "Tech",
  "Health",
  "Business",
  "Education",
  "Science",
  "Entertainment",
  "Lifestyle",
];

export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

export const APP_SETTINGS = {
  ITEMS_PER_PAGE: 10,
  MAX_UPLOAD_SIZE_MB: 5,
  SUPPORT_EMAIL: "support@example.com",
} as const;
