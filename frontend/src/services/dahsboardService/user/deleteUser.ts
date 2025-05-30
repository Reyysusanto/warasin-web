import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UserResponse } from "@/types/user";
import axios, { AxiosError } from "axios";

export const deleteUserService = async (userId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete<UserResponse | ErrorResponse>(
      `${baseURL}/admin/delete-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === true && response.status === 200) {
      return response.data as UserResponse;
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
              "Gagal menghapus data"
          );
        }

        if (axiosError.response.status === 401) {
          throw new Error("Token telah habis");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat menghapus data. Silakan coba lagi."
    );
  }
};
