import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { SongData } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (song: SongData) => void;
  initialSearchTerm: string;
}

// 목데이터
const MOCK_SONGS: SongData[] = [
  {
    id: "1",
    title: "Butter",
    artist: "BTS",
    videoId: "WMweEpGlu_U",
    thumbnail: `http://img.youtube.com/vi/WMweEpGlu_U/0.jpg`,
  },
  {
    id: "2",
    title: "Ditto",
    artist: "NewJeans",
    videoId: "Km71Rr9K-Bw",
    thumbnail: `http://img.youtube.com/vi/Km71Rr9K-Bw/0.jpg`,
  },
  {
    id: "3",
    title: "사건의 지평선",
    artist: "윤하",
    videoId: "BBdC1rl5sKY",
    thumbnail: "https://i.ytimg.com/vi/BBdC1rl5sKY/default.jpg",
  },
  // ... 나머지 7개의 목데이터 추가 ...
];

const SearchModal = ({
  isOpen,
  onClose,
  onSelect,
  initialSearchTerm,
}: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<SongData[]>([]);

  useEffect(() => {
    if (isOpen) {
      // 실제로는 API 호출을 하겠지만, 지금은 목데이터를 필터링
      const filteredSongs = MOCK_SONGS.filter(
        (song) =>
          song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredSongs);
    }
  }, [isOpen, searchTerm]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <SearchHeader>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="노래 또는 아티스트 검색"
            autoFocus
          />
        </SearchHeader>

        <ResultsList>
          {searchResults.map((song) => (
            <ResultItem key={song.id} onClick={() => onSelect(song)}>
              <ThumbnailImage src={song.thumbnail} alt={song.title} />
              <SongInfo>
                <SongTitle>{song.title}</SongTitle>
                <ArtistName>{song.artist}</ArtistName>
              </SongInfo>
            </ResultItem>
          ))}
        </ResultsList>

        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SearchModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const SearchHeader = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const ThumbnailImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 1rem;
`;

const SongInfo = styled.div`
  flex: 1;
`;

const SongTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const ArtistName = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #6c757d;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
`;
