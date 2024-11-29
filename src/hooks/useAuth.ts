import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/store/auth";
import { fetchKakaoAuth } from "@/api/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const login = async (code: string) => {
    try {
      const authData = await fetchKakaoAuth(code);
      const { access_token, profile_id, refresh_token, user_id } = authData;
      setIsAuthenticated(true);
      setUser({
        accessToken: access_token,
        profileId: profile_id,
        refreshToken: refresh_token,
        userId: user_id,
      });
      router.push("/");
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
    router.push("/login");
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      setIsAuthenticated(true);
      setUser(parsedAuth);
    }
  }, []);

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
