import { User } from "@/types/user";
import { atom } from "jotai";

export const isAuthenticatedAtom = atom<boolean>(false);
export const userAtom = atom<User | null>(null);
