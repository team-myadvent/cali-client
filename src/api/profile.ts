import { API_BASE_URL, API_ENDPOINTS, API_METHODS } from "@/constants/api";
import { request } from ".";
import { Profile } from "@/types/profile";

interface MyProfileResponse {
  results: {
    message: string;
    data: Profile;
  };
}

export const updateMyProfile = async (accessToken: string, data: Profile) => {
  const url = `${API_BASE_URL}${API_ENDPOINTS.PROFILE.ME}`;
  return request<MyProfileResponse>(url, {
    method: API_METHODS.PUT,
    accessToken,
    body: JSON.stringify(data),
  });
};
