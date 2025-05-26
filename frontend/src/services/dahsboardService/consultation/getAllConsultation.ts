import { baseURL } from "@/config/api";
import { GetAllConsultationResponse } from "@/types/consultation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const getAllConsultationAdminSrevice = async (): Promise<
  GetAllConsultationResponse | ErrorResponse
> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseURL}/admin/get-all-consultation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as GetAllConsultationResponse;
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
        }
      }

      if (axiosError.response?.status === 401) {
        localStorage.removeItem("token");
      }
    }

    throw new Error("Terjadi kesalahan saat mengambil data. Silakan coba lagi.");
  }
};
