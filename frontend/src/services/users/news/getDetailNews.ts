import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { NewsResponse } from "@/types/news";
import axios, { AxiosError } from "axios";

export const getDetailNewsService = async (
  newsId: string
): Promise<NewsResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${baseURL}/user/get-detail-news/${newsId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as NewsResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }
      }
    }

    throw new Error("Terjadi kesalahan saat mengambil data");
  }
};
