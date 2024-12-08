import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request } from ".";
import { YoutubeVideo } from "@/types/serach";

interface YoutubeSearchResponse {
  results: {
    message: string;
    data: YoutubeVideo[];
  };
}

export const getYoutubeKeywordSearch = async (keyword: string) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.SEARCH.YOUTUBE}?q=${keyword}`;
  return request<YoutubeSearchResponse>(url, {
    method: API_METHODS.GET,
  });
};
