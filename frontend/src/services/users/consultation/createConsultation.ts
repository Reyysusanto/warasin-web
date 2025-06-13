import { baseURL } from "@/config/api";
import {
  CreateConsultation,
  CreateConsultationResponse,
} from "@/types/consultation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const createConsultationService = async (
  data: CreateConsultation
): Promise<CreateConsultationResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/user/create-consultation`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as CreateConsultationResponse;
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
              "Gagal menambahkan data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat menambahkan data");
  }
};
