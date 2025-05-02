import { baseURL } from "@/config/api";
import axios, { AxiosError } from "axios";

type LoginSuccessResponse = {
  status: true;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
  timestamp: string;
};

type LoginErrorResponse = {
  status: false;
  message: string;
  error?: string;
  timestamp: string;
};

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<
      LoginSuccessResponse | LoginErrorResponse
    >(`${baseURL}/user/login`, data);

    if (response.data.status === true && response.data.data.access_token) {
      const token = response.data.data.access_token;
      localStorage.setItem("token", token);
      return true;
    }

    if (response.data.status === false) {
      throw new Error(response.data.error || response.data.message);
    }

    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<LoginErrorResponse>;

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
