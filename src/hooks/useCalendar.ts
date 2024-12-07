import { useState, useEffect } from 'react';
import { getCalendar } from '@/api/calendar';
import type { CalendarItem } from '@/types/calendar';
import { useAuth } from '@/hooks/useAuth';

export const useCalendar = () => {
  const { user } = useAuth();
  const [calendarData, setCalendarData] = useState<CalendarItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (user?.accessToken) {
      getCalendar(user.accessToken)
        .then((res) => {
          const filteredData = res.results.data.slice(0, 25);
          setCalendarData(filteredData);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [user?.accessToken]);

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