import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/type";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export interface TokenPayload {
  user_id: string;
  role_id: string;
  endpoints: string[];
  iss: string;
  exp: number;
  iat: number;
}

export type UpdateDetailUserSuccessResponse = {
  status: boolean;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    is_verified: boolean;
    city: {
      city_id: string | null;
      city_name: string;
      city_type: string;
      province: {
        province_id: string | null;
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
        province_id?: string;
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
      if (token) {
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
          throw new Error(
            response.data.message || "Failed to fetch user details"
          );
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

export const updateDetailUser = async (finalData: {
  birth_date: string;
  gender: string;
  province: string;
  city: string;
  name: string;
  no_hp: string;
  email: string;
}): Promise<UpdateDetailUserSuccessResponse | ErrorResponse | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch<UpdateDetailUserSuccessResponse>(
      `${baseURL}/user/update-user`,
      finalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as UpdateDetailUserSuccessResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login-admin";
          return null;
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
