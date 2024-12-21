import { useRef } from "react";
import { useCalendarCard } from "@/hooks/useCalendarCard";
import { updateCalendarCard } from "@/api/calendar";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { UpdateCalendarCardItem } from "@/types/calendar";
import { useAuth } from "@/hooks/useAuth";
import { getYoutubeKeywordSearch } from "@/api/search";
import Button from "@/components/common/Button";
import { YoutubeVideo } from "@/types/serach";
import { colors } from "@/styles/colors";
import { useShare } from "@/hooks/useShare";
import React from "react";
import Active1Icon from "@/components/common/icons/cardNumber/Active1Icon";
import { Text } from "@/components/common/Text";
import SongChangeIcon from "@/components/common/icons/SongChangeIcon";
import EditIcon from "@/components/common/icons/EditIcon";
import DeleteIcon from "@/components/common/icons/DeleteIcon";
import { createGuestbook, GuestbookRequest } from "@/api/guestbook";

// TODO : input 컴포넌트 만들어 사용하기

const DefaultCalendarCardPage = () => {
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const commentDetailRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { day: cardId } = router.query;
  const { user } = useAuth();
  const { cardData, isLoading, error } = useCalendarCard(null, Number(cardId));

  console.log("user?.userId", user?.userId);
  console.log("cardData", cardData);
  console.log("cardId", cardId);

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
    baseUrl: `https://dev.myadvent-calendar.com/calendars/card/${cardId}`,
  });

  const [editData, setEditData] = useState<UpdateCalendarCardItem>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<YoutubeVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // thumbnail_file 이 있을 때 먼저 thumbnail_file 을 사용하고 없으면 calendar_thumbnail 을 사용
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

  useEffect(() => {
    if (cardData) {
      setEditData({
        youtube_thumbnail_link: cardData.calendar_thumbnail || "",
        youtube_video_id: cardData.youtube_video_id || "",
        title: cardData.title || "",
        comment: cardData.comment || "",
        comment_detail: cardData.comment_detail || "",
        thumbnail_file: null,
      });
    }
  }, [cardData]);

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

          <CommentWrapper>
            <CommentContainer>
              <CommentInput
                ref={commentRef}
                placeholder="오늘의 코멘트"
                value={editData?.comment || ""}
              />
              <CommentDetailInput
                ref={commentDetailRef}
                placeholder="내용을 자유롭게 남겨주세요"
                value={editData?.comment_detail}
              />
            </CommentContainer>
          </CommentWrapper>
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

const CommentWrapper = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentContainer = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  text-align: center;
  font-size: 14px;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.grey[1]};
  }
`;

const CommentDetailInput = styled(CommentInput)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: ${colors.grey[1]};
  }
`;

const HeaderSection = styled.div``;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  padding-left: 40px;
  border: 1px solid ${colors.grey[2]};
  border-radius: 8px;
  font-size: 1rem;

  &::placeholder {
    color: ${colors.grey[2]};
  }
`;

const SearchResults = styled.div`
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${colors.grey[1]};

  &:last-child {
    border-bottom: none;
  }
`;

const SearchResultTitle = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;

const GuestbookWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const GuestbookTitle = styled.h2`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const GuestbookList = styled.div`
  display: grid;
  gap: 12px;
  margin-bottom: 20px;

  // 모바일 기본값: 1열
  grid-template-columns: 1fr;

  // 768px 이상일 때 3열로 변경
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GuestbookItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  break-inside: avoid;
`;

const GuestbookAuthor = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  color: ${colors.grey[2]};
`;

const GuestbookContent = styled.div`
  color: ${colors.black};
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
`;

const GuestbookInputWrapper = styled.div<{ isFocused: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  background: ${colors.white};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid
    ${(props) => (props.isFocused ? colors.red[2] : colors.grey[1])};
  transition: border-color 0.2s ease;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AuthorInput = styled.input`
  border: none;
  outline: none;
  font-size: 15px;
  padding: 8px 0;
  background: transparent;
  &::placeholder {
    color: ${colors.red[3]};
  }

  &:disabled {
    color: ${colors.red[3]};
    cursor: default;
  }
`;

const ContentInput = styled.textarea`
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px 0;
  resize: none;
  height: auto;
  overflow-y: hidden;
  line-height: 1.5;

  &::placeholder {
    color: ${colors.grey[1]};
  }
`;

const SubmitButton = styled(Button)`
  flex-shrink: 0;
  height: fit-content;
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
  justify-content: center; // 중앙 정렬로 변경
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`;

const CoverButtonGroup = styled.div`
  position: absolute; // 절대 위치로 변경
  bottom: 16px; // 하단에서의 간격
  right: 16px; // 우측에서의 간격
  display: flex;
  gap: 8px; // 버튼 사이 간격
`;

const CoverButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  border: none;
  cursor: pointer;
  font-size: 14px;
  display: flex; // flex 추가
  align-items: center; // 수직 중앙 정렬
  justify-content: center; // 수평 중앙 정렬
  gap: 4px; // 아이콘과 텍스트 사이 간격
`;
