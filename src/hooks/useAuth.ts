import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "@/store/auth";
import { fetchKakaoAuth } from "@/api/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUserAtom] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const setUser = (
    newUserData: User | ((prev: User | null) => User | null) | null
  ) => {
    const newUser =
      typeof newUserData === "function" ? newUserData(user) : newUserData;

    setUserAtom(newUser);

    if (newUser) {
      localStorage.setItem("auth", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("auth");
    }
  };

  const login = async (code: string) => {
    try {
      setIsLoading(true);
      const authData = await fetchKakaoAuth(code);
      const { access_token, profile_id, refresh_token, user_id, username } =
        authData;

      const userData = {
        accessToken: access_token,
        profileId: profile_id,
        refreshToken: refresh_token,
        userId: user_id,
        username,
      };

      localStorage.setItem("auth", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData as User);
      router.push("/");
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("auth");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setUser(parsedAuth);
      } catch (error) {
        console.error("저장된 인증 데이터 파싱 에러:", error);
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, [setIsAuthenticated]);

  const logout = () => {
    setIsLoading(true);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
    router.push("/login");
    setIsLoading(false);
  };

  return {
    isAuthenticated,
    user,
    setUser,
    login,
    logout,
    isLoading,
  };
};
