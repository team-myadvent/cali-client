import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../components/Layout/Layout";
import Calendar from "../components/Home";
import { Text } from "@/components/common/Text";
import Button from "@/components/common/Button";
import SongChangeIcon from "@/components/common/icons/SongChangeIcon";
import EditIcon from "@/components/common/icons/EditIcon";
import { useAuth } from "@/hooks/useAuth";

const Home = () => {
  const router = useRouter();
  const handleCalendarClick = (day: number) => {
    router.push(`/calendar/${day}`);
  };

  const { user } = useAuth();
  console.log(user);
  return (
    <Layout>
      <Main>
        {user?.username && `${user?.username}의`} 플레이리스트
        <Calendar isBlurred={false} handleCalendarClick={handleCalendarClick} />
        {/* <Text color="brown.5" variant="body">
          Body
        </Text>
        <Text variant="title">Title</Text>
        <Text variant="subtitle">Subtitle</Text>
        <Text variant="caption">Caption</Text> */}
        {/* 
        <Button variant="export" onClick={() => console.log("clicked")}>
          내보내기
        </Button>
        <Button variant="iconOnly" icon={<EditIcon />} />
        <Button variant="select">선택</Button>
        <Button variant="save">저장</Button> */}
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
