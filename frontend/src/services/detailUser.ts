import { baseURL } from "@/config/api";
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

export type DetailUserSuccessResponse = {
  status: boolean;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    is_verified?: boolean;
    city?: {
      city_id: string;
      city_name: string;
      city_type: string;
      province?: {
        province_id: string;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  };
  timestamp: string;
};

export const getUserFromToken = (): TokenPayload | null => {
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
};

export const getUserDetailService =
  async (): Promise<DetailUserSuccessResponse | null> => {
    const token = localStorage.getItem("token");

    try {
      if(token) {
        const response = await axios.get<DetailUserSuccessResponse>(
          `${baseURL}/user/get-detail-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data.status === true) {
          return response.data;
        } else {
          throw new Error(response.data.message || "Failed to fetch user details");
        }
      } else {
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return null;
        }
      }
      console.error("Error fetching user details:", error);
      return null;
    }
  };
