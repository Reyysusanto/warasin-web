import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { CreateNewsSuccessResponse, UpdateNewsRequest } from "@/types/news";
import axios, { AxiosError } from "axios";

export const updateNewsAdminService = async (
  news_id: string,
  data: Partial<UpdateNewsRequest>
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch<
      CreateNewsSuccessResponse | ErrorResponse
    >(`${baseURL}/admin/update-news/${news_id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as CreateNewsSuccessResponse;
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
          return null;
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal memperbarui data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }
  }
};
