import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import Banner from "../components/Layout/Banner";

const Home = () => {
  const router = useRouter();
  const handleCalendarClick = (day: number) => {
    router.push(`/calendar/${day}`);
  };
  return (
    <Layout>
      <Banner />
      <Main>
        <CalendarList>
          {[...Array(25)].map((_, index) => (
            <CalendarItem
              key={index + 1}
              onClick={() => handleCalendarClick(index + 1)}
            >
              {index + 1}일
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;
