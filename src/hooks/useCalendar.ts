import { useState, useEffect } from "react";
import { getCalendar, getDefaultCalendar } from "@/api/calendar";
import type { CalendarItem } from "@/types/calendar";
import { useAuth } from "@/hooks/useAuth";

export const useCalendar = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isAuthLoading) return;

    const fetchCalendarData = async () => {
      try {
        let response;
        if (user?.accessToken) {
          response = await getCalendar(user.userId);
        } else {
          response = await getDefaultCalendar();
        }
        const filteredData = response.results.data.slice(0, 25);
        setCalendarData(filteredData);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchCalendarData();
  }, [user, isAuthLoading]);

  const handleImageError = (day: number) => {
    setImageErrors((prev) => new Set(prev).add(day));
  };

  return {
    calendarData,
    error,
    imageErrors,
    handleImageError,
    isLoading: isAuthLoading,
  };
};
