import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import Calendar from "../components/calendar";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const router = useRouter();
  const handleCalendarClick = (day: number) => {
    router.push(`/calendar/${day}`);
  };

  const { user } = useAuth();
  //TODO: 로그인안한 유저의 디폴트 캘린더 데이터 가져오기

  return (
    <Layout>
      <Main>
        {user?.username && `${user?.username}의`} 플레이리스트
        <Calendar isBlurred={false} handleCalendarClick={handleCalendarClick} />
      </Main>
    </Layout>
  );
};

export default Home;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
