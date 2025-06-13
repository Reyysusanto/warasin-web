import { baseURL } from "@/config/api";
import {
  ConsultationUserRequest,
  ConsultationUserResponse,
} from "@/types/consultation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const updateConsultationService = async (
  consultationId: string,
  data: Partial<ConsultationUserRequest>
): Promise<ConsultationUserResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseURL}/user/update-consultation/${consultationId}`,
      data,
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
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal memperbarui data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat memperbarui data");
  }
};
