import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  user_id: string;
  role_id: string;
  endpoints: string[];
  iss: string;
  exp: number;
  iat: number;
}

export function getUserFromToken(): TokenPayload | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}


export async function fetchUserDetail() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/user/get-detail-user`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch user detail");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user detail:", error);
    return null;
  }
}