import { baseURL } from "@/config/api";
import axios, { AxiosError } from "axios";

type RegisterSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
  };
};

type RegisterErrorResponse = {
  status: false;
  message: string;
  error?: string;
};

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post<
      RegisterSuccessResponse | RegisterErrorResponse
    >(`${baseURL}/user/register`, data);

    if (response.data.status === true) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<RegisterErrorResponse>;
  
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
