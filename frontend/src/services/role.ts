import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/type";
import axios, { AxiosError } from "axios";

type RoleSuccessResponse = {
  status: true;
  message: string;
  data: Array<{
    role_id: string;
    role_name: string;
  }>;
  timestamp: string;
};

export const getRoleService = async (): Promise<
  RoleSuccessResponse | ErrorResponse
> => {
  try {
    const token = localStorage.getItem("token");
    const result = await axios.get<RoleSuccessResponse | ErrorResponse>(
      `${baseURL}/admin/get-all-role`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (result.status === 200) {
      return result.data as RoleSuccessResponse;
    } else {
      return result.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }

        if (axiosError.response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
