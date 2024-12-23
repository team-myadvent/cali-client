import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { useCalendar } from "@/hooks/useCalendar";
import { isDateBlurred, formatCalendarDate } from "@/utils";
import { useRouter } from "next/router";
import { ActiveIcons, InactiveIcons } from "@/constants/iconMaps";
import type { CalendarItem } from "@/types/calendar";

interface CalendarProps {
  isBlurred: boolean;
  userId?: number;
}

const Calendar = ({ isBlurred, userId }: CalendarProps) => {
  const router = useRouter();

  // userId가 유효한 값인지 확인
  const isValidUserId = !isNaN(Number(userId));

  const { calendarData, imageErrors, handleImageError } = useCalendar(
    isValidUserId ? Number(userId) : 0
  );

  const handleCalendarClick = (day: number) => {
    if (isValidUserId) {
      router.push(`/calendars/card/user/${userId}/${day}`);
    } else {
      router.push(`/calendars/card/${day}`);
    }
  };

  return (
    <CalendarList>
      {calendarData.map((dayData: CalendarItem) => {
        const day = formatCalendarDate(dayData.calendar_dt).day;
        const shouldBlur = isBlurred || isDateBlurred(dayData.calendar_dt);

        // 해당 날짜의 아이콘 컴포넌트 선택
        const IconComponent = shouldBlur
          ? InactiveIcons[day]
          : ActiveIcons[day];

        return (
          <CalendarItem
            key={dayData.id}
            onClick={() => !shouldBlur && handleCalendarClick(day)}
            isBlurred={shouldBlur}
          >
            <CardNumber>
              <IconComponent />
            </CardNumber>
            <ThumbnailWrapper isBlurred={shouldBlur}>
              <img
                src={
                  imageErrors.has(day)
                    ? "/default_thumbnail.png"
                    : dayData.calendar_thumbnail
                }
                alt={`Day ${day} thumbnail`}
                loading="lazy"
                onError={() => !imageErrors.has(day) && handleImageError(day)}
              />
              {!shouldBlur && dayData.title && (
                <TitleOverlay>
                  <StyledText variant="body">{dayData.title}</StyledText>
                </TitleOverlay>
              )}
            </ThumbnailWrapper>
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
  gap: 20px;
  padding: 0 20px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 20px;
  }

  @media (min-width: 541px) and (max-width: 880px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 60px;
  }

  @media (min-width: 881px) and (max-width: 1140px) {
    grid-template-columns: repeat(4, 1fr);
    padding: 0 60px;
  }

  @media (min-width: 1141px) and (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
    padding: 0 60px;
  }

  @media (min-width: 1401px) {
    grid-template-columns: repeat(5, 240px);
    padding: 0 60px;
  }
`;

const CalendarItem = styled.li<{ isBlurred: boolean }>`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  cursor: ${({ isBlurred }) => (isBlurred ? "default" : "pointer")};

  ${({ isBlurred }) =>
    isBlurred &&
    `
    border: 2px dashed white;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -32px;
      width: 64px;
      height: 64px;
      background-color: white;
      border-radius: 50%;
      transform: translateY(-50%);
    }
  `}

  ${({ isBlurred }) =>
    !isBlurred &&
    `
    &:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease-in-out;
    }
  `}
`;

const CardNumber = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThumbnailWrapper = styled.div<{ isBlurred: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${({ isBlurred }) => (isBlurred ? "blur(5px)" : "none")};
  }
`;

const TitleOverlay = styled.div`
  position: absolute;
  bottom: 8px;
  left: 10px;
  right: 10px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  z-index: 1;
`;

const StyledText = styled(Text)`
  color: black;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
