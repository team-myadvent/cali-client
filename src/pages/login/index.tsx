import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { Text } from "@/components/common/Text";
import KaKaoIcon from "@/components/common/icons/KaKaoIcon";

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
      <LoginContainer>
        <ContentWrapper>
          <Text variant="heading" color="black">
            로그인하여 나의 캘리를 만들고
          </Text>
          <Text variant="heading" color="black">
            친구들과 공유해보세요.
          </Text>
          <KakaoLoginButton onClick={handleKakaoLogin}>
            <KaKaoIcon />
            <Text variant="subtitle" style={{ color: "#191919" }}>
              카카오 로그인
            </Text>
          </KakaoLoginButton>
        </ContentWrapper>
      </LoginContainer>
    </Layout>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 24px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
`;

const KakaoLoginButton = styled.div`
  cursor: pointer;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 14px 0;
  width: 100%;
  background-color: #fee500;
  border-radius: 8px;
  max-width: 300px;
  &:hover {
    background-color: #fee500;
    opacity: 0.8;
  }
`;
