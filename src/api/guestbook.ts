import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_METHODS,
  defaultHeaders,
} from "@/constants/api";
import { request } from ".";

interface YoutubeSearchResponse {
  status: boolean;
  status_code: number;
  results: {
    message: string;
    data: null;
  };
}

export interface GuestbookRequest {
  content: string;
  writer_name?: string;
}

export const createGuestbook = async (
  social_id: number,
  calendar_idx: number,
  data: GuestbookRequest,
  accessToken?: string
) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.GUESTBOOK}/${social_id}/${calendar_idx}`;
  return request<YoutubeSearchResponse>(url, {
    method: API_METHODS.POST,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(data),
  });
};
