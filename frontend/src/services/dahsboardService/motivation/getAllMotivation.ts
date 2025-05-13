import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { GetAllMotivationsSuccessRespone } from "@/types/motivation";
import axios, { AxiosError } from "axios";

export const GetAllMotivationsService = async (): Promise<
  GetAllMotivationsSuccessRespone | ErrorResponse
> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseURL}/admin/get-all-motivation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as GetAllMotivationsSuccessRespone;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login-admin";
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

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
