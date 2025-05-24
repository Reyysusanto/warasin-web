import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { GetDetailPsychologResponse } from "@/types/psycholog";
import axios, { AxiosError } from "axios";

export const getDetailPsychologService = async (
  psychologId: string
): Promise<GetDetailPsychologResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${baseURL}/admin/get-detail-psycholog/${psychologId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as GetDetailPsychologResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login-admin";
          throw new Error("Token telah kadaularsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
