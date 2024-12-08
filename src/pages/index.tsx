import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import Calendar from "../components/calendars";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import { useShare } from "@/hooks/useShare";
import ShareModal from "@/components/common/ShareModal";

const Home = () => {
  const { user } = useAuth();
  const {
    isShareModalOpen,
    setIsShareModalOpen,
    shareUrl,
    handleCopyLink,
    handleSaveImage,
    handleShareSNS,
  } = useShare({
    username: user?.username,
    userId: user?.userId,
  });

  return (
    <Layout>
      <Main>
        {user?.username && `${user?.username}의`} 플레이리스트
        <Button variant="export" onClick={() => setIsShareModalOpen(true)}>
          내 플리 공유하기
        </Button>
        <Calendar isBlurred={false} />
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          shareUrl={shareUrl}
          onCopyLink={handleCopyLink}
          onSaveImage={handleSaveImage}
          onShareSNS={handleShareSNS}
        />
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
