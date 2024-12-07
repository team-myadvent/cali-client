import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request } from ".";
import { CalendarItem } from "@/types/calendar";

interface CalendarResponse {
  status: boolean;
  status_code: number;
  results: {
    message: string;
    data: CalendarItem[];
  };
}

export const getCalendar = async (accessToken: string) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.CALENDAR.CALENDARS}`;
  return request<CalendarResponse>(url, {
    method: API_METHODS.GET,
    accessToken,
  });
};
