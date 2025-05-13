import { baseURL } from "@/config/api";
import { adminRefreshTokenService } from "@/services/role/adminRefreshToken";
import { ErrorResponse } from "@/types/error";
import {
  CreateMotivationRequest,
  CreateMotivationSuccessResponse,
} from "@/types/motivation";
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
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        const newAccessToken = await adminRefreshTokenService();

        const retryResponse = await axios.post(
          `${baseURL}/admin/create-motivation`,
          data,
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        return retryResponse.data as CreateMotivationSuccessResponse;
      } catch (error) {
        console.log(error)
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
