import styled from "@emotion/styled";
import { Chip } from "@/components/common/Chip";
import { useState } from "react";
import { Text } from "@/components/common/Text";
import Layout from "@/components/Layout/Layout";
import Calendar from "@/components/calendars";
import KaKaoLoginButton from "@/components/kakao/KaKaoLoginButton";
import { useAuth } from "@/hooks/useAuth";

const DefaultCalendar = () => {
  const [activeYear, setActiveYear] = useState<"2024" | "2025">("2024");
  const { user } = useAuth();

  const getChipVariant = (year: "2024" | "2025") => {
    if (activeYear === "2025") {
      return year === "2024" ? "activeNotClicked" : "inactiveClicked";
    } else {
      return year === "2024" ? "active" : "inactive";
    }
  };

  return (
    <Layout>
      <Main>
        {!user && (
          <>
            <TextWrapper>
              <Text variant={"title"} color="black">
                나의 캘리를 만들고
              </Text>
              <Text variant={"title"} color="black">
                친구들과 공유해보세요.
              </Text>
            </TextWrapper>
            <KaKaoLoginButton />
          </>
        )}

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
          <Calendar isBlurred={false} />
        ) : (
          <MessageContainer>
            <Text variant="body" color="grey.1">
              내년에 또 만나요!
            </Text>
          </MessageContainer>
        )}
      </Main>
    </Layout>
  );
};

export default DefaultCalendar;

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
  margin-top: 12px;
  gap: 8px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 300px);
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
