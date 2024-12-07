import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import styled from "@emotion/styled";
import { SongData } from "@/types";
import SearchModal from "@/components/SearchModal";

const CalendarDetail = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);
  const [comment, setComment] = useState("기본 코멘트입니다.");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsModalOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSongSelect = (song: SongData) => {
    setSelectedSong(song);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setSelectedSong({
      id: "1",
      title: "test",
      artist: "test",
      videoId: "test",
      thumbnail: "test",
    });
  }, []);

  return (
    <Layout>
      <Container>
        <Title>{router.query.day}일의 플레이리스트</Title>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="노래 또는 아티스트를 검색하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>노래 검색하기</SearchButton>
        </SearchContainer>

        <SongInfo>
          <h2>{selectedSong?.title}</h2>
          <p>{selectedSong?.artist}</p>
          <YoutubeEmbed>
            <iframe
              width="560"
              height="315"
              // 받아온 데이터로 변경해주는 부분 로직 수정필요
              src={`https://www.youtube.com/embed/M1xAOaxP9PQ?modestbranding=1&rel=0`}
              allowFullScreen
            />
          </YoutubeEmbed>
          <CommentSection>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={200} // 최대 글자수 설정
              placeholder="코멘트를 입력하세요"
            />
            <span>{comment.length}/200</span>
          </CommentSection>
          <ExportButton>내보내기</ExportButton>
        </SongInfo>

        <SearchModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSongSelect}
          initialSearchTerm={searchTerm}
        />
      </Container>
    </Layout>
  );
};

export default CalendarDetail;

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SongInfo = styled.div`
  margin-top: 2rem;
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
  }
`;

const ExportButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
