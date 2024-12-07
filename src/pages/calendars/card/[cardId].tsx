import { useCalendarCard } from "@/hooks/useCalendarCard";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { formatCalendarDate } from "@/utils";

const CalendarCardPage = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const { cardData, isLoading, error } = useCalendarCard(cardId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!cardData) return <div>데이터를 찾을 수 없습니다.</div>;

  const { day } = formatCalendarDate(cardData.calendar_dt);

  console.log(cardData);
  return (
    <Layout>
      <Container>
        <SongInfo>
          <Title>{cardData.title}</Title>
          <YoutubeEmbed>
            <iframe
              width="560"
              height="315"
              // TODO: response 변경된 후 수정 예정
              // src={cardData.youtube_music_link}
              src={`https://www.youtube.com/embed/M1xAOaxP9PQ?modestbranding=1&rel=0`}
              allowFullScreen
            />
          </YoutubeEmbed>
          <CommentSection>
            <textarea value={cardData.comment} readOnly maxLength={200} />
            <span>{cardData.comment?.length || 0}/200</span>
          </CommentSection>
        </SongInfo>
      </Container>
    </Layout>
  );
};

export default CalendarCardPage;

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SongInfo = styled.div`
  margin-top: 2rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const YoutubeEmbed = styled.div`
  margin: 1rem 0;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 비율 */
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const CommentSection = styled.div`
  margin: 1rem 0;

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    resize: none;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ThumbnailImage = styled.div`
  margin: 1rem 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;
