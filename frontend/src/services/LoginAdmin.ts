import { baseURL } from "@/config/api";
import { LoginAdminSuccessResponse } from "@/types/auth";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const LoginAdminService = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<
      LoginAdminSuccessResponse | ErrorResponse
    >(`${baseURL}/admin/login`, data);

    if (response.data.status === true) {
      const token = response.data.data.access_token;
      localStorage.setItem("token", token);
      return true;
    } else {
      throw new Error(response.data.error || response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Login admin gagal"
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
