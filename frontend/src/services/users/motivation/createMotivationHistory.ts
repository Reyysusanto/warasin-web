import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  MotivationHistoryRequest,
  MotivationHistoryUserResponse,
} from "@/types/motivation";
import axios, { AxiosError } from "axios";

export const createMotivationUserService = async (
  data: MotivationHistoryRequest
): Promise<MotivationHistoryUserResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/user/create-user-motivation`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    if (response.status === 200) {
      return response.data as MotivationHistoryUserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "login";
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
