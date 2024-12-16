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
import ShareModal from "@/components/common/ShareModal";
import React from "react";
import Active1Icon from "@/components/common/icons/cardNumber/Active1Icon";
import { Text } from "@/components/common/Text";
import SongChangeIcon from "@/components/common/icons/SongChangeIcon";

// TODO : input 컴포넌트 만들어서 사용하기
// TODO : throttle / debounce 적용하기

const CalendarCardPage = () => {
  const router = useRouter();
  const { cardId } = router.query;
  const { user } = useAuth();
  const { cardData, isLoading, error } = useCalendarCard(
    user?.userId,
    Number(cardId)
  );

  console.log("cardData", cardData);

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

  const [isEditing, setIsEditing] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [editData, setEditData] = useState<UpdateCalendarCardItem>({
    title: "",
    youtube_video_id: "",
    comment: "",
    comment_detail: "",
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState<YoutubeVideo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { day } = router.query; // URL에서 day 파라미터 가져오기

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  useEffect(() => {
    if (cardId && isNaN(Number(cardId))) {
      router.push("/404");
    }
  }, [cardId]);

  useEffect(() => {
    if (cardData) {
      setEditData({
        ...editData,
        // TODO : 썸네일 파일 수정
        youtube_thumbnail_link: cardData.calendar_thumbnail || "",
        youtube_video_id: cardData.youtube_video_id || "",
        title: cardData.title || "",
        comment: cardData.comment || "",
        comment_detail: cardData.comment_detail || "",
      });
    }
  }, [cardData]);

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

      setYoutubeVideoId(videoId);
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

  const handleCommentChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: "comment" | "comment_detail"
  ) => {
    const newValue = e.target.value;
    setEditData((prev) => ({ ...prev, [field]: newValue }));

    // 자동 저장
    // try {
    //   if (user?.userId && cardData) {
    //     await updateCalendarCard(
    //       user.accessToken || "",
    //       user.userId,
    //       Number(cardId),
    //       { ...editData, [field]: newValue }
    //     );
    //   }
    // } catch (error) {
    //   console.error("댓글 업데이트 실패:", error);
    // }
  };
  console.log("editData", editData);

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
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
            </GuestbookContent>
          </GuestbookItem>
          <GuestbookItem>
            <GuestbookAuthor>캘리짱</GuestbookAuthor>
            <GuestbookContent>
              백자에시최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최애캐롤임최
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
          <ThumbnailContainer onClick={() => setIsVideoPlaying(true)}>
            {!isVideoPlaying ? (
              <ThumbnailImage src={thumbnailUrl} alt="YouTube Thumbnail" />
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
                {searchResults.map((result) => (
                  <SearchResultItem key={result.youtube_video_id}>
                    <div>
                      <SearchResultTitle>{result.title}</SearchResultTitle>
                    </div>
                    <Button
                      onClick={() =>
                        handleSelectVideo(result.youtube_video_id, result.title)
                      }
                      variant="select"
                    >
                      선택
                    </Button>
                  </SearchResultItem>
                ))}
              </SearchResults>
            )
          )}

          <CommentWrapper>
            <CommentContainer>
              <CommentInput
                placeholder="오늘의 코멘트"
                value={editData.comment}
                onChange={(e) => handleCommentChange(e, "comment")}
              />
              <CommentDetailInput
                placeholder="내용을 자유롭게 남겨주세요"
                value={editData.comment_detail}
                onChange={(e) => handleCommentChange(e, "comment_detail")}
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

const CardWrapper = styled.div`
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: #000;
  cursor: pointer;
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

const PlayButtonOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    width: 64px;
    height: 64px;
  }
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
