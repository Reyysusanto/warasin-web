import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/type";
import { createUserSchema } from "@/validations/user";
import axios, { AxiosError } from "axios";
import { z } from "zod";

type CreateUserSchemaType = z.infer<typeof createUserSchema>;

type CreateUsersSuccessResponse = {
  status: boolean;
  message: string;
  data: Array<{
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_birth_date: string
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
  }>;
  timestamp: string;
};

export const createUserService = async (data: CreateUserSchemaType) => {
  try {
    const response = await axios.post<
      CreateUsersSuccessResponse | ErrorResponse
    >(`${baseURL}/admin/create-user`, data);

    if (response.data.status === true) {
      return true;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Create User gagal"
          );
        }

        if (axiosError.response.status === 400) {
          throw new Error("Gagal menambahkan user");
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat menambahkan data. Silakan coba lagi."
    );
  }
};
