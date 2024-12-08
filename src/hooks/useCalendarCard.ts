import { getCalendarCard } from "@/api/calendar";
import { CalendarCardItem } from "@/types/calendar";
import { useState, useEffect } from "react";

export const useCalendarCard = (userId?: number, day?: number) => {
  const [cardData, setCardData] = useState<CalendarCardItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId && day) {
      getCalendarCard(userId, day)
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
