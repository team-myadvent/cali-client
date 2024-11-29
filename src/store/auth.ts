import { atom } from "jotai";

interface User {
  accessToken: string;
  refreshToken: string;
  profileId: string;
  userId: string;
}

export const isAuthenticatedAtom = atom<boolean>(false);
export const userAtom = atom<User | null>(null);
