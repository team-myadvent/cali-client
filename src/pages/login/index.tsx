import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { Text } from "@/components/common/Text";
import KaKaoLoginButton from "@/components/kakao/KaKaoLoginButton";
import { useIsMobile } from "@/hooks/useIsMobile";

const Login = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <LoginContainer>
        <ContentWrapper isMobile={isMobile}>
          <TextWrapper isMobile={isMobile}>
            <Text
              variant={isMobile ? "title" : "heading"}
              color="black"
              style={{ fontWeight: 700 }}
            >
              로그인하여 나의 캘리를 만들고
            </Text>
            <Text
              variant={isMobile ? "title" : "heading"}
              color="black"
              style={{ fontWeight: 700 }}
            >
              친구들과 공유해보세요.
            </Text>
          </TextWrapper>
          <KaKaoLoginButton />
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

const ContentWrapper = styled.div<{ isMobile: boolean }>`
  background: white;
  border-radius: 20px;
  padding: ${({ isMobile }) => (isMobile ? "40px 20px" : "80px 24px")};
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TextWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: ${({ isMobile }) => (isMobile ? "20px" : "40px")};
`;
