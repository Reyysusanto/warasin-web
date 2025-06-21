import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UserResponse } from "@/types/user";
import { createUserSchema } from "@/validations/user";
import axios, { AxiosError } from "axios";
import { z } from "zod";

type CreateUserSchemaType = z.infer<typeof createUserSchema>;

export const createUserService = async (
  data: CreateUserSchemaType,
) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post<
      UserResponse | ErrorResponse
    >(`${baseURL}/admin/create-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as UserResponse;
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

    console.log(error);
  }
};
