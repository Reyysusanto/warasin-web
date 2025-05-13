/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { createUserSchema } from "@/validations/user";
import axios, { AxiosError } from "axios";
import { z } from "zod";

type CreateUserSchemaType = z.infer<typeof createUserSchema>;

type CreateUsersSuccessResponse = {
  status: true;
  message: string;
  data: Array<{
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
  }>;
  timestamp: string;
};

export const createUserService = async (
  data: CreateUserSchemaType,
) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post<
      CreateUsersSuccessResponse | ErrorResponse
    >(`${baseURL}/admin/create-user`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as CreateUsersSuccessResponse;
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
