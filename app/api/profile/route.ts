import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import sql from "@/lib/sql";
import iProfile from "@/types/iProfile";
import createObjectFromMap from "@/utils/create-object-from-map";

export type Action = "sign-in" | "sign-out" | "sign-up";
export type Code = "auth-success" | "auth-error";

type ICodeMapKey = {
  isExistingProfile: boolean;
  action: Action;
};

type ICodeMapValue = {
  message: string;
  code: Code;
};

const authMapValue = [
  [
    { isExistingProfile: true, action: "sign-in" },
    { message: "Signed in Successfuly", code: "auth-success" },
  ],
  [
    { isExistingProfile: false, action: "sign-in" },
    { message: "Wrong credentials", code: "auth-error" },
  ],
  [
    { isExistingProfile: true, action: "sign-up" },
    { message: "Profile already exists", code: "auth-error" },
  ],
  [
    { isExistingProfile: false, action: "sign-up" },
    { message: "Profile Created successfuly", code: "auth-success" },
  ],
];

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.next();
    const body = await request.json();
    const cookiesStore = cookies()
    const action: Action = body.action;
    const requestProfile: iProfile & { password: string } = body.profile;

    const pretendedProfile = (
      await sql`
        SELECT * FROM profiles 
        WHERE email = ${requestProfile.email} AND password = ${requestProfile.password}
    `
    )[0];
    const isExistingProfile = Boolean(pretendedProfile);

    const authMap = createObjectFromMap(new Map());

    authMapValue.forEach((value) => authMap.set(value[0], value[1]));
    const serverResponse = authMap.get({ isExistingProfile, action });

    if (serverResponse?.code === "auth-success") {
      let profile;
      if (action === "sign-up") {
        profile =
          await sql`INSERT INTO profiles (name, email, password) VALUES (${
            requestProfile.name
          }, ${requestProfile.email}, ${requestProfile.password!})`;
      }

      const token = jwt.sign(
        { profile: profile || pretendedProfile },
        "secret"
      );
      cookiesStore.set("profile-token", token)
    }
    return NextResponse.json(serverResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 404 });
  }
}

