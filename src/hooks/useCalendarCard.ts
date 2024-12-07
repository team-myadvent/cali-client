import { CalendarCardResponse, getCalendarCard } from "@/api/calendar";
import { CalendarCardItem } from "@/types/calendar";
import { useState, useEffect } from "react";

export const useCalendarCard = (cardId: string | string[] | undefined) => {
  const [cardData, setCardData] = useState<CalendarCardItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      if (!cardId) return;

      try {
        setIsLoading(true);
        const data: CalendarCardResponse = await getCalendarCard(
          cardId as string
        );

        setCardData(data.results.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCardData();
  }, [cardId]);

  return { cardData, isLoading, error };
};
