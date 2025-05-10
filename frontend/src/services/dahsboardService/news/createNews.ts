/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { createNewsSuccessResponse } from "@/types/news";
import { createNewsSchema } from "@/validations/news";
import axios, { AxiosError } from "axios";
import { z } from "zod";

type CreateNewsSchemaType = z.infer<typeof createNewsSchema>;

export const createNewsService = async (
  data: CreateNewsSchemaType,
) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post<
      createNewsSuccessResponse | ErrorResponse
    >(`${baseURL}/admin/create-news`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as createNewsSuccessResponse;
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
