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
      const { access_token, profile_id, refresh_token, user_id, username } =
        authData;

      const userData = {
        accessToken: access_token,
        profileId: profile_id,
        refreshToken: refresh_token,
        userId: user_id,
        username,
      };

      // localStorage에 인증 데이터 저장
      localStorage.setItem("auth", JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("auth");
      router.push("/login");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
    router.push("/login");
  };
  // const isTokenValid = (token: string) => {
  //   try {
  //     const decoded = jwt_decode(token);
  //     return decoded.exp * 1000 > Date.now();
  //   } catch {
  //     return false;
  //   }
  // };

  // const refreshToken = async () => {
  //   try {
  //     const storedAuth = localStorage.getItem("auth");
  //     if (!storedAuth) throw new Error("No refresh token");

  //     const { refreshToken } = JSON.parse(storedAuth);
  //     const response = await fetch("/api/auth/refresh", {
  //       method: "POST",
  //       body: JSON.stringify({ refreshToken }),
  //     });

  //     const newAuthData = await response.json();
  //     localStorage.setItem("auth", JSON.stringify(newAuthData));
  //     setUser(newAuthData);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     logout();
  //   }
  // };

  // 컴포넌트 마운트 시 localStorage에서 인증 데이터 복원
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        // 토큰 유효성 검사 로직을 추가할 수 있습니다
        setIsAuthenticated(true);
        setUser(parsedAuth);
      } catch (error) {
        console.error("저장된 인증 데이터 파싱 에러:", error);
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
        setUser(null);
      }
    }
  }, [setIsAuthenticated, setUser]); // 의존성 배열에 setter 함수 추가

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};
