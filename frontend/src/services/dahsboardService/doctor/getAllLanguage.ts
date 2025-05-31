import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { LanguageResponse } from "@/types/master";
import axios, { AxiosError } from "axios";

export const getAllLanguageService = async (): Promise<
  LanguageResponse | ErrorResponse
> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      `${baseURL}/admin/get-all-language-master`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 400) {
      return response.data as LanguageResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }

        if (axiosError.response.status === 401) {
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
