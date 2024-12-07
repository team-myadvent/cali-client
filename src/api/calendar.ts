import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request } from ".";
import { CalendarCardItem, CalendarItem } from "@/types/calendar";

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

export const getCalendar = async (accessToken: string) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.LIST}`;
  return request<CalendarResponse>(url, {
    method: API_METHODS.GET,
    accessToken,
  });
};

export const getCalendarCard = async (cardId: string) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.CARD}/${cardId}`;
  return request<CalendarCardResponse>(url, {
    method: API_METHODS.GET,
  });
};
