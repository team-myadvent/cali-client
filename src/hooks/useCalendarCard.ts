import { getCalendarCard, getDefaultCalendarCard } from "@/api/calendar";
import { CalendarCardItem } from "@/types/calendar";
import { useState, useEffect } from "react";

export const useCalendarCard = (userId?: number | null, day?: number) => {
  const [cardData, setCardData] = useState<CalendarCardItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (day) {
      // userId가 있으면 로그인한 유저용 API를, 없으면 기본 API를 호출
      const fetchCard = userId
        ? getCalendarCard(userId, day)
        : getDefaultCalendarCard(day);

      fetchCard
        .then((data) => {
          setCardData(data.results.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [userId, day]);

  return { cardData, isLoading, error };
};
