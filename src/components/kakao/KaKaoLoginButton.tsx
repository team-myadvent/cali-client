import styled from "@emotion/styled";
import { Text } from "@/components/common/Text";
import KaKaoIcon from "@/components/common/icons/KaKaoIcon";
import { colors } from "@/styles/colors";

const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
const scope = ["account_email", "gender", "age_range", "birthday"].join(",");

const KaKaoLoginButton = () => {
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
    <KakaoLoginButton onClick={handleKakaoLogin}>
      <KaKaoIcon />
      <Text variant="subtitle" style={{ color: colors.black }}>
        카카오 로그인
      </Text>
    </KakaoLoginButton>
  );
};

export default KaKaoLoginButton;

const KakaoLoginButton = styled.div`
  cursor: pointer;
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
