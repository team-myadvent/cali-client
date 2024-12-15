import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { Text } from "@/components/common/Text";
import Image from "next/image";

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
          {/* TODO : 이미지에서 컴포넌트 구현으로 변경하기  */}
          <div
            style={{ cursor: "pointer", marginTop: "40px" }}
            onClick={handleKakaoLogin}
          >
            <Image
              src="/kakao_login.png"
              alt="카카오 로고"
              width={300}
              height={45}
            />
          </div>
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
  min-height: calc(100vh - 60px); // 헤더 높이만큼 빼기
  padding: 0 20px;
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 24px;
  padding: 48px 24px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
