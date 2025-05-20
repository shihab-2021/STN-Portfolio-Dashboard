import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    return token;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return null;
  }
};
