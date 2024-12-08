import { useState, useEffect } from "react";
import { getCalendar, getDefaultCalendar } from "@/api/calendar";
import type { CalendarItem } from "@/types/calendar";
import { useAuth } from "@/hooks/useAuth";

export const useCalendar = () => {
  const { user } = useAuth();
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (user?.accessToken) {
      getCalendar(user.userId)
        .then((res) => {
          const filteredData = res.results.data.slice(0, 25);
          setCalendarData(filteredData);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      getDefaultCalendar()
        .then((res) => {
          const filteredData = res.results.data.slice(0, 25);
          setCalendarData(filteredData);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [user]);

  const handleImageError = (day: number) => {
    setImageErrors((prev) => new Set(prev).add(day));
  };

  return {
    calendarData,
    error,
    imageErrors,
    handleImageError,
  };
};
