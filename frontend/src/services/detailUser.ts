import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  DetailUserSuccessResponse,
  UpdateDetailUserRequest,
  UpdateDetailUserSuccessResponse,
} from "@/types/user";
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

export const getUserDetailService = async (): Promise<
  DetailUserSuccessResponse | ErrorResponse
> => {
  try {
    const token = localStorage.getItem("token");
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
      return response.data as DetailUserSuccessResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        throw new Error("Email atau password salah");
      }
    }
    throw new Error("Error fetching user details");
  }
};

export const updateDetailUser = async (data: Partial<UpdateDetailUserRequest>) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch<
      UpdateDetailUserSuccessResponse | ErrorResponse
    >(`${baseURL}/user/update-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

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
          window.location.href = "/login";
          return null;
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal menambahkan data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }
  }
};
