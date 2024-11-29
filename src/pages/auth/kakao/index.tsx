import { useEffect } from "react";

const KakaoRedirectHandler = () => {
  useEffect(() => {
    const code = window.location.search.split("code=")[1].split("&")[0];

    if (code) {
      console.log("Starting login process with code:", code);
      console.log("Initial cookies:", document.cookie);

      fetch(
        `https://dev.myadvent-calendar.com/api/v1/auth/kakao?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키를 받기 위해 필수
        }
      )
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("서버 응답 실패");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Login successful, data:", data);

          // location.href = "/";
        })
        .catch((error) => {
          console.error("카카오 로그인 에러:", error);
          location.href = "/login";
        });
    }
  }, []);

  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoRedirectHandler;
