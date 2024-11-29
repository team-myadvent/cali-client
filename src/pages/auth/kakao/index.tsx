import { useAuth } from "@/hooks/useAuth";

import { useEffect } from "react";

const KakaoRedirectHandler = () => {
  const { login } = useAuth();

  useEffect(() => {
    const code = window.location.search.split("code=")[1].split("&")[0];
    if (code) {
      login(code);
    } else {
      console.error("인증 코드가 존재하지 않습니다.");
    }
  }, []);

  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoRedirectHandler;
