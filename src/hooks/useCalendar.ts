import { useState, useEffect } from "react";
import { getCalendar, getDefaultCalendar } from "@/api/calendar";
import type { CalendarItem } from "@/types/calendar";
import { useAuth } from "@/hooks/useAuth";

export const useCalendar = (userId: number) => {
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        let data;

        if (user) {
          // 로그인한 사용자는 개인 캘린더 데이터 조회
          data = await getCalendar(userId);
          setCalendarData(data.results.data);
        } else {
          // 로그인하지 않은 사용자는 기본 캘린더 데이터 조회
          const defaultData = await getDefaultCalendar();
          setCalendarData(defaultData.results.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      }
    };

    fetchCalendarData();
  }, [userId, user]);

  const handleImageError = (day: number) => {
    setImageErrors((prev) => new Set([...prev, day]));
  };

  return { calendarData, error, imageErrors, handleImageError };
};
