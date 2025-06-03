import { baseURL } from "@/config/api";
import { ConsultationUserResponse } from "@/types/consultation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const deleteConsultationUserService = async (
  consultationId: string
): Promise<ConsultationUserResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${baseURL}/user/delete-consultation/${consultationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as ConsultationUserResponse;
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
              "Gagal menghapus data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat menghapus data");
  }
};
