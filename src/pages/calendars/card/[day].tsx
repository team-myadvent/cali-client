import { useCalendarCard } from "@/hooks/useCalendarCard";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { CalendarCardItem, UpdateCalendarCardItem } from "@/types/calendar";
import Button from "@/components/common/Button";
import { colors } from "@/styles/colors";
import React from "react";
import Active1Icon from "@/components/common/icons/cardNumber/Active1Icon";
import { Text } from "@/components/common/Text";

const DefaultCalendarCardPage = () => {
  const router = useRouter();
  const { day: cardId } = router.query;
  const { cardData, isLoading, error } = useCalendarCard(null, Number(cardId));
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const thumbnailUrl = cardData?.thumbnail_file
    ? cardData.thumbnail_file
    : cardData?.calendar_thumbnail
    ? cardData.calendar_thumbnail
    : undefined;
  useEffect(() => {
    if (cardId && isNaN(Number(cardId))) {
      router.push("/404");
    }
  }, [cardId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!cardData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <Layout>
      <Container>
        <CardWrapper>
          <ThumbnailContainer>
            {!isVideoPlaying ? (
              <>
                <ThumbnailImage src={thumbnailUrl} alt="YouTube Thumbnail" />
                <ButtonOverlay>
                  <PlayButton onClick={() => setIsVideoPlaying(true)}>
                    ▶
                  </PlayButton>
                </ButtonOverlay>
              </>
            ) : (
              <YoutubeEmbed>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${cardData.youtube_video_id}?enablejsapi=1&autoplay=1&mute=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </YoutubeEmbed>
            )}
          </ThumbnailContainer>

          <ContentInfo>
            <Active1Icon variant="detail" />
            <Text variant="heading">{cardData.title}</Text>
          </ContentInfo>

          <CommentWrapper cardData={cardData} />
        </CardWrapper>
        <Button variant="export">내보내기</Button>
      </Container>
    </Layout>
  );
};

export default DefaultCalendarCardPage;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: #000;
`;

const CardWrapper = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #000;
`;

const YoutubeEmbed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ContentInfo = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentWrapper = ({ cardData }: { cardData: CalendarCardItem }) => {
  return (
    <CommentContainer>
      <CommentInput>{cardData?.comment || ""}</CommentInput>
      <CommentDetailInput>{cardData?.comment_detail || ""}</CommentDetailInput>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  border: 1px solid ${colors.grey[1]};
  margin: 0 24px 24px 24px;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentInput = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.black};
  background: transparent;
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommentDetailInput = styled(CommentInput)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 500;
  padding: 16px;
`;

const PlayButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
`;

const ButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`;
