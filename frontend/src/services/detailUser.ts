import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  UpdateDetailUserRequest,
  UserResponse,
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
  UserResponse | ErrorResponse
> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<UserResponse | ErrorResponse>(
      `${baseURL}/user/get-detail-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as UserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Email atau password salah");
      }
    }
    throw new Error("Error fetching user details");
  }
};

export const updateDetailUserService = async (
  data: Partial<UpdateDetailUserRequest>
): Promise<UserResponse | ErrorResponse> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch<
      UserResponse | ErrorResponse
    >(`${baseURL}/user/update-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as UserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token kadaluarsa");
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
    throw new Error("Terjadi kesalahan saat memperbarui data pengguna.");
  }
};
