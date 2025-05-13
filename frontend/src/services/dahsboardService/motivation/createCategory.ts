import { baseURL } from "@/config/api";
import { adminRefreshTokenService } from "@/services/role/adminRefreshToken";
import {
  CreateCategoryMotivationSuccessResponse,
  CreateCategoryRequest,
} from "@/types/categoryMotivation";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const createCategoryMotivationService = async (
  data: CreateCategoryRequest
): Promise<CreateCategoryMotivationSuccessResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/admin/create-motivation-category`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as CreateCategoryMotivationSuccessResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const newAccessToken = await adminRefreshTokenService();

        const retryResponse = await axios.post(
          `${baseURL}/admin/create-motivation-category`,
          data,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return retryResponse.data as CreateCategoryMotivationSuccessResponse;
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
