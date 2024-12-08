import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import Calendar from "../components/calendars";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/common/Button";
import { useState } from "react";
import { colors } from "@/styles/colors";
import Modal from "@/components/common/Modal";
import html2canvas from "html2canvas";
const Home = () => {
  const { user } = useAuth();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareUrl = user?.userId
    ? `https://dev.myadvent-calendar.com/${user.userId}`
    : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

  const handleSaveImage = () => {
    // TODO: 이미지 저장 로직 구현
    const element = document.getElementById("share-image");
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.download = "my-playlist.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleShareSNS = (platform: "twitter" | "facebook") => {
    const text = `${user?.username}의 플레이리스트를 확인해보세요!`;
    const url = encodeURIComponent(shareUrl);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  return (
    <Layout>
      <Main>
        {user?.username && `${user?.username}의`} 플레이리스트
        <Button variant="export" onClick={() => setIsShareModalOpen(true)}>
          내 플리 공유하기
        </Button>
        <Calendar isBlurred={false} />
        <Modal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        >
          <ShareModalContent>
            <ShareImage id="share-image">
              <img src="/default_thumbnail.png" alt="공유 이미지" />
            </ShareImage>

            <ShareUrl>
              <input type="text" value={shareUrl} readOnly />
              <Button variant="save" onClick={handleCopyLink}>
                복사
              </Button>
            </ShareUrl>

            <ShareButtons>
              <Button variant="save" onClick={handleSaveImage}>
                이미지로 저장
              </Button>
              <Button variant="save" onClick={() => handleShareSNS("twitter")}>
                트위터 공유
              </Button>
              <Button variant="save" onClick={() => handleShareSNS("facebook")}>
                페이스북 공유
              </Button>
            </ShareButtons>
          </ShareModalContent>
        </Modal>
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

const ShareModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const ShareImage = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ShareUrl = styled.div`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid ${colors.brown[3]};
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  button {
    flex: 1;
  }
`;
