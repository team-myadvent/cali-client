import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_METHODS,
  defaultHeaders,
} from "@/constants/api";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  profile_id: string;
  user_id: string;
  username: string;
}

export const fetchKakaoAuth = async (code: string): Promise<AuthResponse> => {
  const response = await fetch(
    `${API_BASE_URL}${API_ENDPOINTS.AUTH.KAKAO}?code=${code}`,
    {
      method: API_METHODS.GET,
      headers: defaultHeaders,
      credentials: "include",
    }
  );
  const data = await response.json();

  const resultsData = data?.results?.data;

  if (resultsData) {
    const { access_token, profile_id, refresh_token, user_id, username } =
      resultsData;
    return {
      access_token,
      profile_id,
      refresh_token,
      user_id,
      username,
    };
  } else {
    throw new Error("유효하지 않은 응답 데이터");
  }
};
