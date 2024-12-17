import { useAuth } from "@/hooks/useAuth";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Button from "../common/Button";
import LogoIcon from "../common/icons/LogoIcon";
import LogoutIcon from "../common/icons/LogoutIcon";
import LoginIcon from "../common/icons/LoginIcon";
import { colors } from "@/styles/colors";

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // TODO : mobile 일 경우 8px 20px 적용해야함 isMobile?
  padding: 48px 60px 8px 60px;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.beige};
  align-items: center;
  z-index: 1000;
  // TODO : mobile 일 경우 8px 20px 적용해야함 isMobile?
  padding: 8px 60px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const Footer = styled.footer`
  padding: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin-top: 1rem;
`;

const FooterLink = styled.a`
  margin: 0 1rem;
  color: #666;
  text-decoration: none;

  &:hover {
    color: #0070f3;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <>
      <Header>
        <LogoIcon
          style={{
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        />
        {!isLoginPage && (
          <ProfileSection>
            {isAuthenticated ? (
              <HeaderActions>
                <Button
                  variant="iconText"
                  icon={<LogoutIcon />}
                  onClick={logout}
                >
                  로그아웃
                </Button>
                <Button variant="export">공유하기</Button>
              </HeaderActions>
            ) : (
              <Button
                variant="iconText"
                icon={<LoginIcon />}
                onClick={handleLoginClick}
              >
                로그인
              </Button>
            )}
          </ProfileSection>
        )}
      </Header>
      <Container>
        <Main>{children}</Main>
        <Footer>
          <FooterContent>
            <p>© 2024 Cali. All rights reserved.</p>
            <FooterLinks>
              <FooterLink href="/terms">이용약관</FooterLink>
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
              <FooterLink href="/contact">문의하기</FooterLink>
            </FooterLinks>
          </FooterContent>
        </Footer>
      </Container>
    </>
  );
};

export default Layout;
