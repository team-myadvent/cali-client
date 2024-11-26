import styled from "@emotion/styled";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>Cali</BannerTitle>
        <BannerText>Calendar + playList</BannerText>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  background-color: #f5f5f5;
  padding: 4rem 2rem;
  text-align: center;
`;

const BannerContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BannerText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;
