import { baseURL } from "@/config/api";
import axios, { AxiosError } from "axios";

type userErrorResponse = {
  status: false;
  message: string;
  timestamp: string;
  error?: string;
};

type usersSuccessResponse = {
  status: boolean;
  message: string;
  meta: {
    page: number;
    per_page: 10;
    max_page: number;
    count: number;
  };
  data: Array<{
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    is_verified: boolean;
    city: {
      city_id: null;
      city_name: string;
      city_type: string;
      province: {
        province_id: null;
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

export const GetAllUsers = async (): Promise<
  usersSuccessResponse | userErrorResponse | null
> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}/admin/get-all-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data as usersSuccessResponse;
    } else {
      return response.data as userErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<userErrorResponse>;

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
