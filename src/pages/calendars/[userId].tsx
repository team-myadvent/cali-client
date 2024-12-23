import styled from "@emotion/styled";
import { useAuth } from "@/hooks/useAuth";
import { useShare } from "@/hooks/useShare";
import ShareModal from "@/components/common/ShareModal";
import ProfileSection from "@/components/profile/ProfileSection";
import { Chip } from "@/components/common/Chip";
import { useState } from "react";
import { Text } from "@/components/common/Text";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import Calendar from "@/components/calendars";
import { usePage } from "@/hooks/usePage";

const UserCalendar = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { user } = useAuth();
  const [activeYear, setActiveYear] = useState<"2024" | "2025">("2024");
  const { isOtherUserPage } = usePage();
  const getChipVariant = (year: "2024" | "2025") => {
    if (activeYear === "2025") {
      return year === "2024" ? "activeNotClicked" : "inactiveClicked";
    } else {
      return year === "2024" ? "active" : "inactive";
    }
  };

  const {
    isShareModalOpen,
    setIsShareModalOpen,
    shareUrl,
    handleCopyLink,
    handleSaveImage,
    handleShareSNS,
  } = useShare({
    username: user?.username,
    userId: Number(userId), // URL의 userId 사용
  });

  return (
    <Layout>
      <Main>
        {!isOtherUserPage && <ProfileSection />}
        <ChipContainer>
          <Chip
            variant={getChipVariant("2024")}
            onClick={() => setActiveYear("2024")}
          >
            2024
          </Chip>
          <Chip
            variant={getChipVariant("2025")}
            onClick={() => setActiveYear("2025")}
          >
            2025
          </Chip>
        </ChipContainer>
        {activeYear === "2024" ? (
          <Calendar isBlurred={false} userId={Number(userId)} />
        ) : (
          <MessageContainer>
            <Text variant="body" color="grey.1">
              내년에 또 만나요!
            </Text>
          </MessageContainer>
        )}
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

export default UserCalendar;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  width: 100%;
`;
