import { baseURL } from "@/config/api";
import { DeleteCategoryMotivationSuccessResponse } from "@/types/categoryMotivation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const deleteCategoryMotivationService = async (
  category_id: string
): Promise<DeleteCategoryMotivationSuccessResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${baseURL}/admin/delete-motivation-category/${category_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as DeleteCategoryMotivationSuccessResponse;
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
              "Gagal menghapus data"
          );
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat menghapus data. Silakan coba lagi."
    );
  }
};
