import styled from "@emotion/styled";
import Modal from "./Modal";
import Button from "./Button";
import { colors } from "@/styles/colors";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  onCopyLink: () => void;
  onSaveImage: () => void;
  onShareSNS: (platform: "twitter" | "facebook") => void;
  thumbnailUrl?: string;
}

const ShareModal = ({
  isOpen,
  onClose,
  shareUrl,
  onCopyLink,
  onSaveImage,
  onShareSNS,
  thumbnailUrl = "/default_thumbnail.png",
}: ShareModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ShareModalContent>
        <ShareImage id="share-image">
          <img src={thumbnailUrl} alt="공유 이미지" />
        </ShareImage>

        <ShareUrl>
          <input type="text" value={shareUrl} readOnly />
          <Button variant="save" onClick={onCopyLink}>
            복사
          </Button>
        </ShareUrl>

        <ShareButtons>
          <Button variant="save" onClick={onSaveImage}>
            이미지로 저장
          </Button>
          <Button variant="save" onClick={() => onShareSNS("twitter")}>
            트위터 공유
          </Button>
          <Button variant="save" onClick={() => onShareSNS("facebook")}>
            페이스북 공유
          </Button>
        </ShareButtons>
      </ShareModalContent>
    </Modal>
  );
};

export default ShareModal;

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
