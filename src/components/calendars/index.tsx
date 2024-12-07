import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { colors } from "@/styles/colors";
import Image from "next/image";
import { useCalendar } from "@/hooks/useCalendar";
import { isDateBlurred, formatCalendarDate } from "@/utils";
import { useRouter } from "next/router";

interface CalendarProps {
  isBlurred: boolean;
}

const Calendar = ({ isBlurred }: CalendarProps) => {
  const router = useRouter();
  const { calendarData, error, imageErrors, handleImageError } = useCalendar();
  const handleCalendarClick = (cardId: string) => {
    router.push(`/calendars/card/${cardId}`);
  };

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <CalendarList>
      {calendarData.map((dayData) => {
        const day = formatCalendarDate(dayData.calendar_dt).day;
        const shouldBlur = isBlurred || isDateBlurred(dayData.calendar_dt);

        return (
          <CalendarItem
            key={dayData.id}
            onClick={() => !shouldBlur && handleCalendarClick(dayData.id)}
            isBlurred={shouldBlur}
          >
            <CardNumber isBlurred={shouldBlur}>{day}</CardNumber>
            <ThumbnailWrapper isBlurred={shouldBlur}>
              <Image
                width={200}
                height={200}
                src={
                  imageErrors.has(day)
                    ? "/default_thumbnail.png"
                    : dayData.calendar_thumbnail
                }
                alt={`Day ${day} thumbnail`}
                style={{
                  objectFit: "cover",
                }}
                loading="lazy"
                onError={() => !imageErrors.has(day) && handleImageError(day)}
              />
            </ThumbnailWrapper>
            {!shouldBlur && dayData.title && (
              <StyledText color="brown.5" variant="body">
                {dayData.title}
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
      border-width: 3px;
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
