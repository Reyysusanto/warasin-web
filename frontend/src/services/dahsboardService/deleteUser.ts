import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

type DeleteSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_birth_date: string;
    user_phone_number: string;
    is_verified: boolean;
    city: {
      city_id: string;
      city_name: string;
      city_type: string;
      province: {
        province_id: string;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  };
  timestamp: string;
};

export const deleteUserService = async (userId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete<DeleteSuccessResponse | ErrorResponse>(
      `${baseURL}/admin/delete-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === true && response.status === 200) {
      return response.data as DeleteSuccessResponse;
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
