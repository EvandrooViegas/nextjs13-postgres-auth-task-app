"use server";

import iProfile from "@/types/iProfile";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const getProfile = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("profile-token")?.value;
  const verifiedToken = token
    ? (jwt.verify(token, "secret") as { profile: iProfile } | null)
    : null;
  return verifiedToken?.profile;
};

const isLoggedIn = () => {
  const profile = getProfile();
  return Boolean(profile);
};

export { getProfile, isLoggedIn }