import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UpdateUserAdminRequest, updateUserAdminResponse } from "@/types/user";
import axios, { AxiosError } from "axios";

export const updateUserAdminService = async (
  user_id: string,
  data: Partial<UpdateUserAdminRequest>
) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch<updateUserAdminResponse | ErrorResponse>(
      `${baseURL}/admin/update-user/${user_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as updateUserAdminResponse;
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
              "Gagal menambahkan data"
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
