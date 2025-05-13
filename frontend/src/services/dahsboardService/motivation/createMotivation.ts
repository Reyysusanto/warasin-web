import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { CreateMotivationRequest, CreateMotivationSuccessResponse } from "@/types/motivation";
import axios, { AxiosError } from "axios";

export const createMotivationService = async (
  data: CreateMotivationRequest
): Promise<CreateMotivationSuccessResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/admin/create-motivation`,
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
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal menambahkan data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error("Gagal menambahkan berita");
  }
};
