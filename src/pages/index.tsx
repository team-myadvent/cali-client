import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const router = useRouter();
  const handleCalendarClick = (day: number) => {
    router.push(`/calendar/${day}`);
  };
  return (
    <Layout>
      <Main>
        <CalendarList>
          {[...Array(25)].map((_, index) => (
            <CalendarItem
              key={index + 1}
              onClick={() => handleCalendarClick(index + 1)}
            >
              <ThumbnailWrapper isBlurred={index !== 0}>
                <ThumbnailImage
                  src={`https://img.youtube.com/vi/Km71Rr9K-Bw/0.jpg`}
                  alt={`Day ${index + 1} thumbnail`}
                />
              </ThumbnailWrapper>
              <DayText>{index + 1}일</DayText>
            </CalendarItem>
          ))}
        </CalendarList>
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

const CalendarList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

const CalendarItem = styled.li`
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ThumbnailWrapper = styled.div<{ isBlurred: boolean }>`
  width: 100%;
  position: relative;

  ${({ isBlurred }) =>
    isBlurred &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-radius: 4px;
    }
  `}
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const DayText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
`;
