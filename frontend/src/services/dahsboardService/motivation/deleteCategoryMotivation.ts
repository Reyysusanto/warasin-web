import { baseURL } from "@/config/api";
import { adminRefreshTokenService } from "@/services/role/adminRefreshToken";
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const newAccessToken = await adminRefreshTokenService();

        const retryResponse = await axios.delete(
          `${baseURL}/admin/delete-motivation-category/${category_id}`,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return retryResponse.data as DeleteCategoryMotivationSuccessResponse;
      } catch (error) {
        console.log(error);
        throw new Error("Session expired. Please log in again.");
      }
    }

    if (axios.isAxiosError(error)) {
      const err = error as AxiosError<ErrorResponse>;
      throw new Error(err.response?.data?.message || "Gagal menambahkan data");
    }

    throw new Error("Terjadi kesalahan saat menambahkan data motivasi");
  }
};
