import { baseURL } from "@/config/api";
import { LoginSuccessResponse } from "@/types/auth";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<
      LoginSuccessResponse | ErrorResponse
    >(`${baseURL}/user/login`, data);

    if (response.data.status === true && response.data.data.access_token) {
      const token = response.data.data.access_token;
      const refreshToken = response.data.data.refresh_token;
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refreshToken);
      return true;
    }

    if (response.data.status === false) {
      throw new Error(response.data.error || response.data.message);
    }

    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Login gagal"
          );
        }

        if (axiosError.response.status === 401) {
          throw new Error("Email atau password salah");
        }
      }
    }

    throw new Error("Terjadi kesalahan saat login. Silakan coba lagi.");
  }
};
