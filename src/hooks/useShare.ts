import { useState } from "react";
import html2canvas from "html2canvas";

interface UseShareProps {
  username?: string;
  userId?: number;
  baseUrl?: string;
}

export const useShare = ({
  username,
  userId,
  baseUrl = "https://dev.myadvent-calendar.com",
}: UseShareProps) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const shareUrl = userId ? `${baseUrl}/${userId}` : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

  const handleSaveImage = () => {
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
    const text = `${username}의 플레이리스트를 확인해보세요!`;
    const url = encodeURIComponent(shareUrl);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    };

    window.open(shareUrls[platform], "_blank");
  };

  return {
    isShareModalOpen,
    setIsShareModalOpen,
    shareUrl,
    handleCopyLink,
    handleSaveImage,
    handleShareSNS,
  };
};
