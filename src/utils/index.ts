import type { CalendarItem } from "@/types/calendar";

// 현재 날짜 정보를 가져오는 유틸리티 함수
export const getCurrentDateInfo = () => {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };
};

// 날짜 문자열에서 연도, 월, 일을 추출하는 함수
export const formatCalendarDate = (date: string) => {
  const dateObj = new Date(date);
  return {
    day: dateObj.getDate(),
    month: dateObj.getMonth(),
    year: dateObj.getFullYear(),
  };
};

// 날짜 비교 함수
/**
 * @param calendarDate 비교할 날짜
 * @returns isBlurred true면 블러, false면 블러 안됨
 */
export const isDateBlurred = (calendarDate: string) => {
  const current = getCurrentDateInfo();
  const targetDate = formatCalendarDate(calendarDate);

  // 연도 비교
  if (targetDate.year > current.year) {
    return true;
  }

  // 같은 연도일 경우 월 비교
  if (targetDate.year === current.year && targetDate.month > current.month) {
    return true;
  }

  // 같은 연도, 같은 월일 경우 일 비교
  if (
    targetDate.year === current.year &&
    targetDate.month === current.month &&
    targetDate.day > current.day
  ) {
    return true;
  }

  return false;
};
