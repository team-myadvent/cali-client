import Layout from "@/components/Layout/Layout";

const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
const scope = ["account_email", "gender", "age_range", "birthday"].join(",");

const Login = () => {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }

    try {
      window.Kakao.Auth.authorize({
        redirectUri,
        scope,
      });
    } catch (error) {
      console.error("카카오 로그인 에러:", error);
    }
  };

  return (
    <Layout>
      {/* TODO : 로그인 버튼 변경예정 */}
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </Layout>
  );
};

export default Login;
