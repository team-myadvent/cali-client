import { useAuth } from "@/hooks/useAuth";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Button from "../common/Button";
import { colors } from "@/styles/colors";

interface LayoutProps {
  children: React.ReactNode;
}

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

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <Container>
      <Header>
        <Logo onClick={handleLogoClick}>cali</Logo>
        {!isLoginPage && (
          <ProfileSection>
            {isAuthenticated ? (
              <UserProfile>
                <UserNickname onClick={handleProfileClick}>
                  {user?.profileId || "사용자"}
                </UserNickname>
                <LoginButton onClick={logout}>로그아웃</LoginButton>
              </UserProfile>
            ) : (
              <Button variant="export" onClick={handleLoginClick}>
                로그인
              </Button>
            )}
          </ProfileSection>
        )}
      </Header>

      {children}

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
  );
};

export default Layout;

const Container = styled.div`
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 2rem;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0051cc;
  }
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
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const UserNickname = styled.span`
  font-weight: 500;
  color: ${colors.brown[5]};
`;
