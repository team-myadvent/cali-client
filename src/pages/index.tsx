import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { API_ENDPOINTS } from "@/constants/api";

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push(`${API_ENDPOINTS.CALENDAR.LIST}/${user.userId}`);
    } else {
      router.push(`${API_ENDPOINTS.CALENDAR.LIST}`);
    }
  }, [user, router]);

  return null;
};

export default Home;
