import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { DeleteNewsSuccessResponse } from "@/types/news";
import axios, { AxiosError } from "axios";

export const deleteNewsService = async (newsId: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${baseURL}/admin/delete-news/${newsId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as DeleteNewsSuccessResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal menghapus berita"
          );
        }

        if (axiosError.response.status === 401) {
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat menghapus data. Silakan coba lagi."
    );
  }
};
