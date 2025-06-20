import { URLs } from "@/constants/urls";
import axios from "axios";
import { cookies } from "next/headers";

export const ensureAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  
  if (!refreshToken) {
    // login first
  }
  if (accessToken) {
    console.log("AccessToken and refreshToken", accessToken, refreshToken);
    return accessToken;
  }
  console.log("No AccessToken but refreshToken", accessToken, refreshToken);

  // else refresh access token
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await axios.get(
    `${URLs.backend}/api/v1/auth/refresh-access-token`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    }
  );
  if (res.data.success) {
    //backend ne cookies me set kr diya h accessToken
    return res.data.accessToken;
  } else {
    //login first
  }
};
