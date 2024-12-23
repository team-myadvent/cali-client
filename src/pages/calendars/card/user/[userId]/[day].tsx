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
import { Text } from "@/components/common/Text";
import SongChangeIcon from "@/components/common/icons/SongChangeIcon";
import { createGuestbook, GuestbookRequest } from "@/api/guestbook";
import { media } from "@/styles/breakpoints";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ActiveIcons } from "@/constants/iconMaps";

const CalendarCardPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const commentDetailRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const { day: cardId, userId } = router.query;
  const { user } = useAuth();
  const { cardData, isLoading, error } = useCalendarCard(
    Number(userId),
    Number(cardId)
  );

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

  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;

    try {
      setIsSearching(true);
      const response = await getYoutubeKeywordSearch(searchKeyword);

      setSearchResults(response.results.data);
    } catch (error) {
      console.error("검색 실패:", error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectVideo = async (videoId: string, title: string) => {
    if (!user?.userId || !cardData) return;

    try {
      const updateData = {
        ...editData,
        title: title,
        youtube_video_id: videoId,
        youtube_thumbnail_link: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      };

      await updateCalendarCard(
        user.accessToken || "",
        user.userId,
        Number(cardId),
        updateData
      );

      setEditData(updateData);
      setSearchResults([]);
      setSearchKeyword("");

      router.reload();
    } catch (error) {
      console.error("업데이트 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "comment" | "comment_detail"
  ) => {
    const newValue = e.target.value;
    setEditData((prev) => ({ ...prev, [field]: newValue }));
  };

  const handleCommentKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    field: "comment" | "comment_detail"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = (e.target as HTMLTextAreaElement).value;

      if (user?.userId && cardData) {
        try {
          await updateCalendarCard(
            user.accessToken || "",
            user.userId,
            Number(cardId),
            { ...editData, [field]: newValue }
          );
          // ref를 통한 포커스 아웃
          commentRef.current?.blur();
        } catch (error) {
          console.error("댓글 업데이트 실패:", error);
        }
      }
    }
  };

  const handleCoverEdit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !user?.userId || !cardData || !editData) return;

    try {
      const updateData: UpdateCalendarCardItem = {
        title: editData.title || "",
        comment: editData.comment || "",
        comment_detail: editData.comment_detail || "",
        youtube_video_id: editData.youtube_video_id || "",
        youtube_thumbnail_link: editData.youtube_thumbnail_link || "",
        thumbnail_file: file,
      };

      await updateCalendarCard(
        user.accessToken || "",
        user.userId,
        Number(cardId),
        updateData
      );

      router.reload();
    } catch (error) {
      console.error("커버 업데이트 실패:", error);
      alert("커버 이미지 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleCoverDelete = async () => {
    if (!user?.userId || !cardData || !editData) return;

    try {
      const updateData: UpdateCalendarCardItem = {
        thumbnail_file: null,
      };

      await updateCalendarCard(
        user.accessToken || "",
        user.userId,
        Number(cardId),
        updateData
      );

      router.reload();
    } catch (error) {
      console.error("커버 삭제 실패:", error);
      alert("커버 이미지 삭제 중 오류가 발생했습니다.");
    }
  };

  interface GuestbookInput {
    writer_name: string;
    content: string;
  }

  const GuestbookSection = () => {
    const isMobile = useIsMobile();
    const [guestbookInput, setGuestbookInput] = useState<GuestbookInput>({
      writer_name: user?.username || "",
      content: "",
    });
    const [isInputFocused, setIsInputFocused] = useState(false);
    const handleSubmitGuestbook = async () => {
      if (!cardData || !guestbookInput.content) return;

      try {
        const requestData: GuestbookRequest = {
          content: guestbookInput.content,
          // 로그인하지 않은 경우에만 writer_name 전송
          ...(user ? {} : { writer_name: guestbookInput.writer_name }),
        };

        await createGuestbook(
          Number(userId),
          Number(cardId),
          requestData,
          user?.accessToken
        );

        // 입력 필드 초기화
        setGuestbookInput({
          writer_name: user?.username || "",
          content: "",
        });

        // TODO : 성공 메시지 또는 새로고침 등 추가 처리
        router.reload();
        alert("방명록이 등록되었습니다.");
      } catch (error) {
        console.error("방명록 등록 실패:", error);
        alert("방명록 등록에 실패했습니다.");
      }
    };

    return (
      <GuestbookWrapper>
        <GuestbookTitle>방명록 {cardData?.guestbooks.length}개</GuestbookTitle>
        <GuestbookList>
          {cardData?.guestbooks.map((guestbook, index) => (
            <GuestbookItem key={index}>
              <GuestbookAuthor>
                {guestbook.writer_name || "익명"}
              </GuestbookAuthor>
              <GuestbookContent>{guestbook.content}</GuestbookContent>
            </GuestbookItem>
          ))}
        </GuestbookList>
        <GuestbookInputWrapper isFocused={isInputFocused}>
          <InputContainer>
            {!user && (
              <AuthorInput
                value={guestbookInput.writer_name}
                onChange={(e) =>
                  setGuestbookInput((prev) => ({
                    ...prev,
                    writer_name: e.target.value,
                  }))
                }
                placeholder="닉네임"
                disabled={!!user}
              />
            )}
            <ContentInput
              value={guestbookInput.content}
              onChange={(e) =>
                setGuestbookInput((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="내용을 남겨주세요. (최대 100자)"
              maxLength={100}
            />
          </InputContainer>
          {!isMobile && (
            <SubmitButton
              variant="register"
              onClick={handleSubmitGuestbook}
              disabled={!guestbookInput.content.trim()}
            >
              등록하기
            </SubmitButton>
          )}
        </GuestbookInputWrapper>
        {isMobile && (
          <SubmitButton
            variant="register"
            onClick={handleSubmitGuestbook}
            disabled={!guestbookInput.content.trim()}
          >
            등록하기
          </SubmitButton>
        )}
      </GuestbookWrapper>
    );
  };

  // 현재 페이지가 자신의 캘린더인지 확인
  const isOwnCalendar = user?.userId === userId;

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
                  src={`https://www.youtube.com/embed/${cardData.youtube_video_id}?enablejsapi=1&autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </YoutubeEmbed>
            )}
          </ThumbnailContainer>

          <ContentInfo>
            {React.createElement(ActiveIcons[Number(cardId)], {
              variant: "detail",
            })}
            <Text variant="heading">{cardData.title}</Text>
          </ContentInfo>

          {/* 자신의 캘린더일 때만 노래 검색 표시 */}
          {isOwnCalendar && (
            <SearchContainer isFocused={isFocused} isSearching={isSearching}>
              <SearchInputWrapper>
                <IconWrapper isFocused={isFocused} isSearching={isSearching}>
                  <SongChangeIcon />
                </IconWrapper>
                <SearchInput
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="노래 검색..."
                  disabled={isSearching}
                />
              </SearchInputWrapper>
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((result) => (
                    <SearchResultItem key={result.youtube_video_id}>
                      <SearchResultInfo>
                        <SearchResultTitle>{result.title}</SearchResultTitle>
                      </SearchResultInfo>
                      <SelectButton
                        onClick={() =>
                          handleSelectVideo(
                            result.youtube_video_id,
                            result.title
                          )
                        }
                      >
                        선택
                      </SelectButton>
                    </SearchResultItem>
                  ))}
                </SearchResults>
              )}
            </SearchContainer>
          )}

          <CommentWrapper>
            <CommentContainer>
              {/* 자신의 캘린더일 때는 수정 가능한 textarea, 아닐 때는 읽기 전용 div */}
              {isOwnCalendar ? (
                <>
                  <CommentInput
                    value={editData?.comment || ""}
                    onChange={(e) => handleCommentChange(e, "comment")}
                    onKeyDown={(e) => handleCommentKeyDown(e, "comment")}
                    placeholder="오늘의 코멘트"
                  />
                  <CommentDetailInput
                    value={editData?.comment_detail || ""}
                    onChange={(e) => handleCommentChange(e, "comment_detail")}
                    onKeyDown={(e) => handleCommentKeyDown(e, "comment_detail")}
                    placeholder="내용을 자유롭게 남겨주세요"
                  />
                </>
              ) : (
                <>
                  <CommentReadOnly>{cardData?.comment}</CommentReadOnly>
                  <CommentDetailReadOnly>
                    {cardData?.comment_detail}
                  </CommentDetailReadOnly>
                </>
              )}
            </CommentContainer>
          </CommentWrapper>
        </CardWrapper>
        <GuestbookSection />
        <Button variant="export">내보내기</Button>
      </Container>
    </Layout>
  );
};

export default CalendarCardPage;

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

const CommentWrapper = styled.div``;

const HeaderSection = styled.div``;

const SearchContainer = styled.div<{
  isFocused: boolean;
  isSearching: boolean;
}>`
  display: flex;
  border: 1px solid
    ${(props) =>
      props.isFocused || props.isSearching ? colors.red[2] : colors.grey[1]};
  flex-direction: column;
  border-radius: 20px;
  margin: 24px;
  transition: border-color 0.2s ease;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 16px;
  box-sizing: border-box;
  ${media.mobile} {
    width: 80%;
  }
`;

const IconWrapper = styled.div<{
  isFocused: boolean;
  isSearching: boolean;
}>`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  z-index: 1;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 12px 0;
  padding-left: 40px;

  font-size: 16px;
  border: none;

  ${media.mobile} {
    font-size: 14px;
    padding: 10px;
    padding-left: 40px;
  }

  &::placeholder {
    color: ${colors.grey[2]};
  }

  &:focus {
    outline: none;
    border-color: ${colors.black};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const SearchResults = styled.div`
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px 20px;

  ${media.mobile} {
    padding: 0 16px;
  }
`;

const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 12px;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const SearchResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0; // flex-basis 버그 방지
`;

const SearchResultTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.black};
  word-break: break-word;
  overflow-wrap: break-word;

  ${media.mobile} {
    font-size: 14px;
    line-height: 1.4;
  }
`;

const SelectButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${colors.black};
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  ${media.mobile} {
    width: 100%;
    padding: 10px;
  }

  &:hover {
    background-color: ${colors.grey[1]};
  }
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
  align-items: flex-start;
  width: 100%;
  background: ${colors.white};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid
    ${(props) => (props.isFocused ? colors.red[2] : colors.grey[1])};
  transition: border-color 0.2s ease;

  ${media.mobile} {
    flex-direction: column;
    padding: 12px;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
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

  ${media.mobile} {
    width: 100%;
    margin-top: 8px;
  }
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

const CommentContainer = styled.div`
  border: 1px solid ${colors.grey[1]};
  margin: 24px;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.black};
  background: transparent;
  white-space: pre-wrap;
  word-break: break-word;
  &::placeholder {
    color: ${colors.grey[1]};
  }
  &:focus {
    outline: none;
  }
`;

const CommentDetailInput = styled(CommentInput)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: ${colors.grey[1]};
  }
  &:focus {
    outline: none;
  }
`;

// 읽기 전용 코멘트를 위한 스타일 컴포넌트 추가
const CommentReadOnly = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: ${colors.black};
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommentDetailReadOnly = styled(CommentReadOnly)`
  font-size: 16px;
  font-weight: 500;
  margin-top: 12px;
  padding-top: 12px;
`;
