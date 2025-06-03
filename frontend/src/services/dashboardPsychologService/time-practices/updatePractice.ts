import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { PracticeRequest, PracticeResponse } from "@/types/master";
import axios, { AxiosError } from "axios";

export const updatePracticeService = async (
  pracId: string,
  data: Partial<PracticeRequest>
): Promise<PracticeResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseURL}/psycholog/update-practice/${pracId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as PracticeResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login-psycholog";
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengupdate data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }
    throw new Error("Terjadi kesalahan saat mengupdate data. Silakan coba lagi");
  }
};
