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
        youtube_video_id: cardData.youtube_video_id,
      });
      setYoutubeVideoId(cardData.youtube_video_id);
      setIsEditing(true);
    }
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!cardData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <Layout>
      <Container>
        <HeaderSection>
          {user && !isEditing ? (
            <>
              <SearchContainer>
                <SearchInput
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="노래 검색..."
                  disabled={isSearching}
                />
                <Button
                  variant="register"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? "검색 중..." : "검색"}
                </Button>
              </SearchContainer>
              <ButtonGroup>
                <Button
                  variant="export"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  내보내기
                </Button>
                <Button variant="register" onClick={handleEditClick}>
                  수정하기
                </Button>
              </ButtonGroup>
            </>
          ) : user && isEditing ? (
            <ButtonGroup>
              <Button variant="register" onClick={handleSave}>
                저장
              </Button>
              <Button variant="register" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </ButtonGroup>
          ) : null}
        </HeaderSection>

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
            <CommentTitle>코멘트</CommentTitle>
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
            <CommentLength>
              {(isEditing ? editData.comment : cardData.comment)?.length || 0}
              /200
            </CommentLength>

            <CommentTitle style={{ marginTop: "1rem" }}>
              상세 코멘트
            </CommentTitle>
            <textarea
              value={
                isEditing ? editData.comment_detail : cardData.comment_detail
              }
              onChange={
                isEditing
                  ? (e) =>
                      setEditData((prev) => ({
                        ...prev,
                        comment_detail: e.target.value,
                      }))
                  : undefined
              }
              readOnly={!isEditing}
              maxLength={1000}
              placeholder={isEditing ? "상세 코멘트를 입력하세요" : ""}
            />
            <CommentLength>
              {(isEditing ? editData.comment_detail : cardData.comment_detail)
                ?.length || 0}
              /1000
            </CommentLength>
          </CommentSection>
        </SongInfo>

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          shareUrl={shareUrl}
          onCopyLink={handleCopyLink}
          onSaveImage={handleSaveImage}
          onShareSNS={handleShareSNS}
          thumbnailUrl={`https://img.youtube.com/vi/${cardData?.youtube_video_id}/maxresdefault.jpg`}
        />
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
    font-family: inherit;
    line-height: 1.5;

    &:focus {
      outline: none;
      border-color: ${colors.grey[3]};
    }

    &::placeholder {
      color: ${colors.grey[2]};
    }
  }
`;

const ThumbnailImage = styled.img`
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

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SearchResults = styled.div`
  margin-top: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const SearchResultTitle = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;

const CommentTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${colors.black};
`;

const CommentLength = styled.span`
  display: block;
  text-align: right;
  color: ${colors.grey[3]};
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;
