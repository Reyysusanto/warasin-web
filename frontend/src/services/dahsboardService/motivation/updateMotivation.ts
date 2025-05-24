import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import {
  CreateMotivationSuccessResponse,
  UpdateMotivationRequest,
} from "@/types/motivation";
import axios, { AxiosError } from "axios";

export const updateMotivationService = async (
  motivationId: string,
  data: Partial<UpdateMotivationRequest>
): Promise<CreateMotivationSuccessResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${baseURL}/admin/update-motivation/${motivationId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as CreateMotivationSuccessResponse;
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
        throw new Error("Token telah kadaluarsa");
      }
    }

    throw new Error("Terjadi kesalahan saat mengubah data. Silakan coba lagi.");
  }
};
