import { baseURL } from "@/config/api";
import { ConsultationResponse } from "@/types/consultation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const updateConsultationService = async (
  consultationId: string,
  status: number
): Promise<ConsultationResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseURL}/psycholog/update-consultation/${consultationId}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as ConsultationResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "login-psycholog";
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
    throw new Error("Terjadi kesalahan saat memperbarui data");
  }
};
