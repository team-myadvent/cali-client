import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { colors } from "@/styles/colors";
import { useCalendar } from "@/hooks/useCalendar";
import { isDateBlurred, formatCalendarDate } from "@/utils";
import { useRouter } from "next/router";
import Active1Icon from "../common/icons/cardNumber/Active1Icon";
import Active2Icon from "../common/icons/cardNumber/Active2Icon";
import Active3Icon from "../common/icons/cardNumber/Active3Icon";
import Active4Icon from "../common/icons/cardNumber/Active4Icon";
import Active5Icon from "../common/icons/cardNumber/Active5Icon";
import Active6Icon from "../common/icons/cardNumber/Active6Icon";
import Active7Icon from "../common/icons/cardNumber/Active7Icon";
import Active8Icon from "../common/icons/cardNumber/Active8Icon";
import Active9Icon from "../common/icons/cardNumber/Active9Icon";
import Active10Icon from "../common/icons/cardNumber/Active10Icon";
import Active11Icon from "../common/icons/cardNumber/Active11Icon";
import Active12Icon from "../common/icons/cardNumber/Active12Icon";
import Active13Icon from "../common/icons/cardNumber/Active13Icon";
import Active14Icon from "../common/icons/cardNumber/Active14Icon";
import Active15Icon from "../common/icons/cardNumber/Active15Icon";
import Active16Icon from "../common/icons/cardNumber/Active16Icon";
import Active17Icon from "../common/icons/cardNumber/Active17Icon";
import Active18Icon from "../common/icons/cardNumber/Active18Icon";
import Active19Icon from "../common/icons/cardNumber/Active19Icon";
import Active20Icon from "../common/icons/cardNumber/Active20Icon";
import Active21Icon from "../common/icons/cardNumber/Active21Icon";
import Active22Icon from "../common/icons/cardNumber/Active22Icon";
import Active23Icon from "../common/icons/cardNumber/Active23Icon";
import Active24Icon from "../common/icons/cardNumber/Active24Icon";
import Active25Icon from "../common/icons/cardNumber/Active25Icon";
import InActive1Icon from "../common/icons/cardNumber/InActive1Icon";
import InActive2Icon from "../common/icons/cardNumber/InActive2Icon";
import InActive3Icon from "../common/icons/cardNumber/InActive3Icon";
import InActive4Icon from "../common/icons/cardNumber/InActive4Icon";
import InActive5Icon from "../common/icons/cardNumber/InActive5Icon";
import InActive6Icon from "../common/icons/cardNumber/InActive6Icon";
import InActive7Icon from "../common/icons/cardNumber/InActive7Icon";
import InActive8Icon from "../common/icons/cardNumber/InActive8Icon";
import InActive9Icon from "../common/icons/cardNumber/InActive9Icon";
import InActive10Icon from "../common/icons/cardNumber/InActive10Icon";
import InActive11Icon from "../common/icons/cardNumber/InActive11Icon";
import InActive12Icon from "../common/icons/cardNumber/InActive12Icon";
import InActive13Icon from "../common/icons/cardNumber/InActive13Icon";
import InActive14Icon from "../common/icons/cardNumber/InActive14Icon";
import InActive15Icon from "../common/icons/cardNumber/InActive15Icon";
import InActive16Icon from "../common/icons/cardNumber/InActive16Icon";
import InActive17Icon from "../common/icons/cardNumber/InActive17Icon";
import InActive18Icon from "../common/icons/cardNumber/InActive18Icon";
import InActive19Icon from "../common/icons/cardNumber/InActive19Icon";
import InActive20Icon from "../common/icons/cardNumber/InActive20Icon";
import InActive21Icon from "../common/icons/cardNumber/InActive21Icon";
import InActive22Icon from "../common/icons/cardNumber/InActive22Icon";
import InActive23Icon from "../common/icons/cardNumber/InActive23Icon";
import InActive24Icon from "../common/icons/cardNumber/InActive24Icon";
import InActive25Icon from "../common/icons/cardNumber/InActive25Icon";
import { SVGProps } from "react";

type IconType = ({ ...props }: SVGProps<SVGSVGElement>) => JSX.Element;
type IconMapType = { [key: number]: IconType };

const ActiveIcons: IconMapType = {
  1: Active1Icon,
  2: Active2Icon,
  3: Active3Icon,
  4: Active4Icon,
  5: Active5Icon,
  6: Active6Icon,
  7: Active7Icon,
  8: Active8Icon,
  9: Active9Icon,
  10: Active10Icon,
  11: Active11Icon,
  12: Active12Icon,
  13: Active13Icon,
  14: Active14Icon,
  15: Active15Icon,
  16: Active16Icon,
  17: Active17Icon,
  18: Active18Icon,
  19: Active19Icon,
  20: Active20Icon,
  21: Active21Icon,
  22: Active22Icon,
  23: Active23Icon,
  24: Active24Icon,
  25: Active25Icon,
};

const InactiveIcons: IconMapType = {
  1: InActive1Icon,
  2: InActive2Icon,
  3: InActive3Icon,
  4: InActive4Icon,
  5: InActive5Icon,
  6: InActive6Icon,
  7: InActive7Icon,
  8: InActive8Icon,
  9: InActive9Icon,
  10: InActive10Icon,
  11: InActive11Icon,
  12: InActive12Icon,
  13: InActive13Icon,
  14: InActive14Icon,
  15: InActive15Icon,
  16: InActive16Icon,
  17: InActive17Icon,
  18: InActive18Icon,
  19: InActive19Icon,
  20: InActive20Icon,
  21: InActive21Icon,
  22: InActive22Icon,
  23: InActive23Icon,
  24: InActive24Icon,
  25: InActive25Icon,

  // ... 25까지
};

interface CalendarProps {
  isBlurred: boolean;
}

interface CalendarItemProps {
  isBlurred: boolean;
  isActive?: boolean; // 활성화된 날짜인지 여부
  isRed?: boolean; // 빨간색 스탬프인지 초록색 스탬프인지
}

const Calendar = ({ isBlurred }: CalendarProps) => {
  const router = useRouter();
  const { calendarData, error, imageErrors, handleImageError } = useCalendar();

  const getThumbnailUrl = (dayData: any) => {
    // 날짜 비교를 위해 시간을 제거하고 날짜만 비교
    const cardDate = new Date(dayData.calendar_dt);
    cardDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 날짜 비교를 위해 타임스탬프 사용
    const cardTimestamp = cardDate.getTime();
    const todayTimestamp = today.getTime();

    // 오늘 이하(이전 날짜 + 오늘)인 경우 YouTube 썸네일
    if (cardTimestamp <= todayTimestamp && dayData.youtube_video_id) {
      return `https://img.youtube.com/vi/${dayData.youtube_video_id}/maxresdefault.jpg`;
    }

    // 오늘 초과인 경우 캘린더 썸네일
    if (cardTimestamp > todayTimestamp && dayData.calendar_thumbnail) {
      return dayData.calendar_thumbnail;
    }

    // youtube_video_id나 calendar_thumbnail이 없는 경우
    return "/default_thumbnail.png";
  };

  const handleCalendarClick = (day: number) => {
    router.push(`/calendars/card/${day}`);
  };

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <CalendarList>
      {calendarData.map((dayData) => {
        const day = formatCalendarDate(dayData.calendar_dt).day;
        const shouldBlur = isBlurred || isDateBlurred(dayData.calendar_dt);
        const thumbnailUrl = getThumbnailUrl(dayData);

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
                width={200}
                height={200}
                src={
                  imageErrors.has(day) ? "/default_thumbnail.png" : thumbnailUrl
                }
                alt={`Day ${day} thumbnail`}
                style={{ objectFit: "cover" }}
                loading="lazy"
                onError={() => !imageErrors.has(day) && handleImageError(day)}
              />
            </ThumbnailWrapper>
            {!shouldBlur && dayData.title && (
              <StyledText color="black" variant="body">
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
  max-width: 1024px;
  margin: 0 auto;
`;

const CalendarItem = styled.li<{ isBlurred: boolean }>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  cursor: ${({ isBlurred }) => (isBlurred ? "default" : "pointer")};

  ${({ isBlurred }) =>
    isBlurred &&
    `
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
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: ${({ isBlurred }) => (isBlurred ? "blur(5px)" : "none")};
  }
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
  background-color: ${colors.beige};
  white-space: nowrap;
  padding: 8px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  z-index: 2;
`;
