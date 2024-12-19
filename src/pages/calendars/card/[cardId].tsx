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

// TODO : input 컴포넌트 만들어서 사용하기

const CalendarCardPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const commentDetailRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { cardId } = router.query;
  const { user } = useAuth();
  const { cardData, isLoading, error } = useCalendarCard(
    user?.userId,
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

      // 업데이트 후 페이지 새로고침
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
      console.log("Current editData:", editData);

      const updateData: UpdateCalendarCardItem = {
        title: editData.title || "",
        comment: editData.comment || "",
        comment_detail: editData.comment_detail || "",
        youtube_video_id: editData.youtube_video_id || "",
        youtube_thumbnail_link: editData.youtube_thumbnail_link || "",
        thumbnail_file: file,
      };

      console.log("Sending updateData:", updateData);

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
        title: editData.title || "",
        comment: editData.comment || "",
        comment_detail: editData.comment_detail || "",
        youtube_video_id: editData.youtube_video_id || "",
        youtube_thumbnail_link: editData.youtube_thumbnail_link || "",
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

  const GuestbookSection = () => {
    const [guestbookInput, setGuestbookInput] = useState({
      author: "",
      content: "",
    });

    return (
      <GuestbookWrapper>
        <GuestbookTitle>방명록 5개</GuestbookTitle>
        <GuestbookList>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          {/* 다른 방명록 아이템들... */}
        </GuestbookList>
        <GuestbookInputWrapper>
          <InputContainer>
            <AuthorInput
              placeholder="작성자명"
              value={guestbookInput.author}
              onChange={(e) =>
                setGuestbookInput((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
            />
            <ContentInput
              placeholder="내용을 남겨주세요. (최대 100자)"
              value={guestbookInput.content}
              onChange={(e) =>
                setGuestbookInput((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
              maxLength={100}
            />
          </InputContainer>
          <SubmitButton>등록하기</SubmitButton>
        </GuestbookInputWrapper>
      </GuestbookWrapper>
    );
  };

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
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCoverEdit}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <CoverButton onClick={() => fileInputRef.current?.click()}>
                    커버 수정
                  </CoverButton>
                  <CoverButton onClick={handleCoverDelete}>
                    커버 삭제
                  </CoverButton>
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

          {user && (
            <HeaderSection>
              <SearchContainer>
                <SearchInputWrapper>
                  <IconWrapper>
                    <SongChangeIcon />
                  </IconWrapper>
                  <SearchInput
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="노래 검색..."
                    disabled={isSearching}
                  />
                </SearchInputWrapper>
              </SearchContainer>
            </HeaderSection>
          )}

          {isSearching ? (
            <SearchResults>
              <SearchResultItem>
                <SearchResultTitle>검색 중...</SearchResultTitle>
              </SearchResultItem>
            </SearchResults>
          ) : (
            searchResults.length > 0 && (
              <SearchResults>
                {searchResults.map((result) => {
                  return (
                    <SearchResultItem key={result.youtube_video_id}>
                      <div>
                        <SearchResultTitle>{result.title}</SearchResultTitle>
                      </div>
                      <Button
                        onClick={() =>
                          handleSelectVideo(
                            result.youtube_video_id,
                            result.title
                          )
                        }
                        variant="select"
                      >
                        선택
                      </Button>
                    </SearchResultItem>
                  );
                })}
              </SearchResults>
            )
          )}

          <CommentWrapper>
            <CommentContainer>
              <CommentInput
                ref={commentRef}
                placeholder="오늘의 코멘트"
                value={editData?.comment || ""}
                onChange={(e) => handleCommentChange(e, "comment")}
                onKeyDown={(e) => handleCommentKeyDown(e, "comment")}
              />
              <CommentDetailInput
                ref={commentDetailRef}
                placeholder="내용을 자유롭게 남겨주세요"
                value={editData?.comment_detail}
                onChange={(e) => handleCommentChange(e, "comment_detail")}
                onKeyPress={(e) => handleCommentKeyDown(e, "comment_detail")}
              />
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-item: center;
  gap: 20px;
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
  opacity: 0;
  transition: opacity 0.2s;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: #000;
  cursor: pointer;

  &:hover ${ButtonOverlay} {
    opacity: 1;
  }
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
  font-size: 20px;
  font-weight: 700;
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
`;

const GuestbookTitle = styled.h2`
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const GuestbookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const GuestbookItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const GuestbookAuthor = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

const GuestbookContent = styled.div`
  color: #333;
  font-size: 14px;
  line-height: 1.5;
`;

const GuestbookInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: white;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #eee;
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
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &::placeholder {
    color: #999;
  }
`;

const ContentInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px 0;

  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background: #f4a7aa;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

  &:hover {
    background: #f39599;
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
`;

const CoverButton = styled.button`
  position: absolute;
  bottom: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:first-of-type {
    right: 120px;
  }

  &:last-of-type {
    right: 16px;
  }
`;
