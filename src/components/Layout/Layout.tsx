import { useAuth } from "@/hooks/useAuth";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Button from "../common/Button";
import LogoIcon from "../common/icons/LogoIcon";
import LogoutIcon from "../common/icons/LogoutIcon";
import LoginIcon from "../common/icons/LoginIcon";
import { colors } from "@/styles/colors";
import { usePage } from "@/hooks/usePage";
import { useIsMobile } from "@/hooks/useIsMobile";
import { media } from "@/styles/breakpoints";

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 60px 8px 60px;

  ${media.mobile} {
    padding: 40px 20px 8px 20px;
  }
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);

  ${media.mobile} {
    height: calc(100vh - 40px);
  }
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
  padding: 8px 60px;

  ${media.mobile} {
    padding: 8px 20px;
    height: 40px;
  }
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

  ${media.mobile} {
    font-size: 12px;
  }
`;

const FooterLinks = styled.div`
  margin-top: 1rem;

  ${media.mobile} {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const FooterLink = styled.a`
  margin: 0 1rem;
  color: #666;
  text-decoration: none;

  ${media.mobile} {
    margin: 0;
    font-size: 12px;
  }

  &:hover {
    color: #0070f3;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${media.mobile} {
    gap: 12px;
  }

  button {
    ${media.mobile} {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
`;

const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated, logout } = useAuth();
  const { isLoginPage } = usePage();
  const router = useRouter();

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
                <Button
                  variant="export"
                  onClick={() => {
                    console.log("공유하기");
                  }}
                >
                  공유하기
                </Button>
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
