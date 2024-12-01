import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { colors } from "@/styles/colors";

interface CalendarProps {
  handleCalendarClick: (day: number) => void;
  isBlurred: boolean;
}

const Calendar = ({ handleCalendarClick, isBlurred }: CalendarProps) => {
  return (
    <CalendarList>
      {[...Array(25)].map((_, index) => {
        const day = index + 1;

        return (
          <CalendarItem
            key={day}
            onClick={() => !isBlurred && handleCalendarClick(day)}
            isBlurred={isBlurred}
          >
            <CardNumber isBlurred={isBlurred}>{day}</CardNumber>
            <ThumbnailWrapper isBlurred={isBlurred}>
              {/* [!] maxresdefault.jpg 형식의 이미지 파일은 유튜브 영상에 따라 불러오지 못하는 경우가 있다.
               */}
              <ThumbnailImage
                src={`https://img.youtube.com/vi/cg6dxedUJ3U/maxresdefault.jpg`}
                alt={`Day ${day} thumbnail`}
              />
            </ThumbnailWrapper>
            {!isBlurred && (
              <StyledText color="brown.5" variant="body">
                {/* TODO title 로 변경 */}
                All I want for Christmas is you - Mariah Carey
              </StyledText>
            )}
          </CalendarItem>
        );
      })}
    </CalendarList>
  );
};

export default Calendar;

const CalendarList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
  justify-content: center;
  align-items: center;
  max-width: 640px;
  margin: 0 auto;
`;

const CalendarItem = styled.li<{ isBlurred: boolean }>`
  width: 200px;
  height: 200px;
  border: ${({ isBlurred }) =>
    isBlurred ? "none" : `1px solid ${colors.brown[3]}`};
  border-radius: 12px;
  text-align: center;
  transition: all 0.2s;
  cursor: ${({ isBlurred }) => (isBlurred ? "default" : "pointer")};
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: ${({ isBlurred }) => (!isBlurred ? "translateY(-2px)" : "none")};
    box-shadow: ${({ isBlurred }) =>
      !isBlurred
        ? "0 4px 12px rgba(0, 0, 0, 0.1)"
        : "0 2px 8px rgba(0, 0, 0, 0.05)"};
  }

  ${({ isBlurred }) =>
    isBlurred &&
    `
    // TODO : isDashed 일 때 border 임의로 만들어주기 해야함
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-style: dotted;
      border-width: 2px;
      border-color: ${colors.white};
      border-radius: 12px;
      z-index: 3;
      pointer-events: none;
    }
  `}
`;

const CardNumber = styled.div<{ isBlurred?: boolean }>`
  position: absolute;
  top: ${({ isBlurred }) => (isBlurred ? "-42px" : "10px")};
  left: ${({ isBlurred }) => (isBlurred ? "50%" : "10px")};
  transform: ${({ isBlurred }) => (isBlurred ? "translateX(-50%)" : "none")};
  background-color: ${({ isBlurred }) =>
    isBlurred ? colors.white : colors.brown[5]};
  color: ${({ isBlurred }) => (isBlurred ? colors.brown[3] : colors.lemon)};
  border-radius: 50%;
  width: ${({ isBlurred }) => (isBlurred ? "84px" : "60px")};
  height: ${({ isBlurred }) => (isBlurred ? "80px" : "60px")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${({ isBlurred }) => (isBlurred ? "40px" : "0")};
  box-sizing: border-box;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const ThumbnailWrapper = styled.div<{ isBlurred: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

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
      background: rgba(255, 255, 255, 0.1);
      z-index: 1;
    }
  `}
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledText = styled(Text)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.lemon};
  white-space: nowrap;
  padding: 8px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  z-index: 2;
`;
