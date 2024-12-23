import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export const usePage = () => {
  const router = useRouter();
  const { user } = useAuth();

  // 로그인 페이지 체크
  const isLoginPage = router.pathname === "/login";

  // 현재 경로에서 userId 추출
  const getCurrentUserId = () => {
    if (router.pathname === "/calendars/[userId]") {
      return router.query.userId as string;
    }

    const pathSegments = router.asPath.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    return !isNaN(Number(lastSegment)) ? lastSegment : null;
  };

  const currentUserId = getCurrentUserId();

  // 다른 사용자의 캘린더 페이지인지 확인
  const isOtherUserPage =
    currentUserId &&
    user?.userId &&
    String(currentUserId) !== String(user.userId); // 문자열로 비교

  return {
    isLoginPage,
    currentUserId,
    isOtherUserPage,
    pathname: router.asPath,
  };
};
