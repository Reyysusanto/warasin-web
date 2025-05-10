import { baseURL } from "@/config/api";
import { RegisterRequest, RegisterSuccessResponse } from "@/types/auth";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const registerService = async (data: RegisterRequest) => {
  try {
    const response = await axios.post<
      RegisterSuccessResponse | ErrorResponse
    >(`${baseURL}/user/register`, data);

    if (response.data.status === true) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
  
        if (axiosError.response) {
          if (axiosError.response.data.status === false) {
            throw new Error(
              axiosError.response.data.error ||
                axiosError.response.data.message ||
                "Registrasi gagal"
            );
          }
  
          if (axiosError.response.status === 400) {
            throw new Error("Gagal registrasi akun");
          }
        }
      }
  
      throw new Error("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
  }
};
