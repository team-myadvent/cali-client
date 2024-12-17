export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: {
    KAKAO: "/auth/kakao",
  },
  CALENDAR: {
    LIST: "/calendars",
    CARD: "/calendars/card",
  },
  SEARCH: {
    YOUTUBE: "/search",
  },
  PROFILE: {
    ME: "/profiles/me",
  },
};

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const defaultHeaders = {
  "Content-Type": "application/json",
};
