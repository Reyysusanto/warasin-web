import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { AllMotivationHistoryUserResponse } from "@/types/motivation";
import axios, { AxiosError } from "axios";

export const getAllHistoryMotivationService = async (): Promise<
  AllMotivationHistoryUserResponse | ErrorResponse
> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${baseURL}/user/get-all-user-motivation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as AllMotivationHistoryUserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat mengambil data");
  }
};
