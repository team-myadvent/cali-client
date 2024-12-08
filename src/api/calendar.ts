import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request } from ".";
import {
  CalendarCardItem,
  CalendarItem,
  UpdateCalendarCardItem,
} from "@/types/calendar";

interface CalendarResponse {
  status: boolean;
  status_code: number;
  results: {
    message: string;
    data: CalendarItem[];
  };
}

export interface CalendarCardResponse {
  status: boolean;
  status_code: number;
  results: {
    message: string;
    data: CalendarCardItem;
  };
}

export const getCalendar = async (userId: number) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.LIST}/${userId}`;
  return request<CalendarResponse>(url, {
    method: API_METHODS.GET,
  });
};

export const getDefaultCalendar = async () => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.LIST}`;
  return request<CalendarResponse>(url, {
    method: API_METHODS.GET,
  });
};

export const getCalendarCard = async (userId: number, idx: number) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.CARD}/${userId}/${idx}`;
  return request<CalendarCardResponse>(url, {
    method: API_METHODS.GET,
  });
};
export const getDefaultCalendarCard = async (idx: number) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.LIST}?idx=${idx}`;
  return request<CalendarCardResponse>(url, {
    method: API_METHODS.GET,
  });
};

export const updateCalendarCard = async (
  accessToken: string,
  userId: number,
  idx: number,
  data: UpdateCalendarCardItem
) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.CARD}/${userId}/${idx}`;
  return request<CalendarCardResponse>(url, {
    method: API_METHODS.PUT,
    accessToken,
    body: JSON.stringify(data),
  });
};
