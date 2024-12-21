import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request, requestFormData } from ".";
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

  // 파일이 있는 경우와 없는 경우를 구분
  if (data.thumbnail_file) {
    const formData = new FormData();
    formData.append("thumbnail_file", data.thumbnail_file);

    // 나머지 데이터는 JSON 문자열로 변환하여 추가
    const jsonData = {
      title: data.title,
      comment: data.comment,
      comment_detail: data.comment_detail,
      youtube_video_id: data.youtube_video_id,
      youtube_thumbnail_link: data.youtube_thumbnail_link,
    };

    formData.append("data", JSON.stringify(jsonData));

    // FormData를 사용할 때는 Content-Type 헤더를 제거 (브라우저가 자동으로 설정)
    return requestFormData<CalendarCardResponse>(url, {
      method: API_METHODS.PUT,
      accessToken,
      body: formData,
    });
  } else {
    // 파일이 없는 경우는 기본 헤더 사용 (request 함수에서 자동으로 설정)
    return request<CalendarCardResponse>(url, {
      method: API_METHODS.PUT,
      accessToken,
      body: JSON.stringify(data),
    });
  }
};
