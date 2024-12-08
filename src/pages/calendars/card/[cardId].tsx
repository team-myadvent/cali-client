import { useCalendarCard } from "@/hooks/useCalendarCard";
import { updateCalendarCard } from "@/api/calendar";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { formatCalendarDate } from "@/utils";
import { useState, useEffect } from "react";
import { UpdateCalendarCardItem } from "@/types/calendar";
import { useAuth } from "@/hooks/useAuth";

const CalendarCardPage = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const { user } = useAuth();
  const { cardData, isLoading, error } = useCalendarCard(
    user?.userId,
    Number(cardId)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [editData, setEditData] = useState<UpdateCalendarCardItem>({
    title: "",
    comment: "",
    youtube_video_id: "",
  });

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  useEffect(() => {
    if (cardId && isNaN(Number(cardId))) {
      router.push("/404");
    }
  }, [cardId]);

  const handleEditClick = () => {
    if (cardData) {
      setEditData({
        title: cardData.title,
        comment: cardData.comment,
        youtube_video_id: cardData.youtube_video_id,
      });
      setYoutubeVideoId(cardData.youtube_video_id);
      setIsEditing(true);
    }
  };

  const handleYoutubeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVideoId = e.target.value;
    setYoutubeVideoId(newVideoId);
    setEditData((prev) => ({
      ...prev,
      youtube_video_id: newVideoId,
      youtube_thumbnail_link: `https://img.youtube.com/vi/${newVideoId}/maxresdefault.jpg`,
    }));
  };

  const handleSave = async () => {
    if (!user?.userId || !cardData) return;

    try {
      await updateCalendarCard(
        user?.accessToken || "",
        user?.userId,
        Number(cardId),
        editData
      );
      setIsEditing(false);
      router.reload();
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!cardData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <Layout>
      <Container>
        <HeaderSection>
          {user && !isEditing ? (
            <EditButton onClick={handleEditClick}>수정하기</EditButton>
          ) : user && isEditing ? (
            <ButtonGroup>
              <SaveButton onClick={handleSave}>저장</SaveButton>
              <CancelButton onClick={() => setIsEditing(false)}>
                취소
              </CancelButton>
            </ButtonGroup>
          ) : null}
        </HeaderSection>

        <SongInfo>
          {isEditing ? (
            <>
              <Input
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="제목을 입력하세요"
              />
              <Input
                value={youtubeVideoId}
                onChange={handleYoutubeIdChange}
                placeholder="YouTube 비디오 ID를 입력하세요"
              />
            </>
          ) : (
            <Title>{cardData.title}</Title>
          )}

          <YoutubeEmbed>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${
                isEditing ? youtubeVideoId : cardData.youtube_video_id
              }?modestbranding=1&rel=0`}
              allowFullScreen
            />
          </YoutubeEmbed>

          <CommentSection>
            <textarea
              value={isEditing ? editData.comment : cardData.comment}
              onChange={
                isEditing
                  ? (e) =>
                      setEditData((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                  : undefined
              }
              readOnly={!isEditing}
              maxLength={200}
              placeholder={isEditing ? "코멘트를 입력하세요" : ""}
            />
            <span>
              {(isEditing ? editData.comment : cardData.comment)?.length || 0}
              /200
            </span>
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

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
`;

const EditButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  border: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;
