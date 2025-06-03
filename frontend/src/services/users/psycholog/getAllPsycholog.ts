import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { AllPsychologUserResponse } from "@/types/psycholog";
import axios, { AxiosError } from "axios";

export const getAllPsychologUserService = async (filters?: {
  name?: string;
  city?: string;
}): Promise<AllPsychologUserResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams();

  if (filters?.name) params.append("name", filters.name);
  if (filters?.city) params.append("city", filters.city);

  try {
    const response = await axios.get(
      `${baseURL}/user/get-all-psycholog?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as AllPsychologUserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "login";
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal mengambil data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat mengambil data");
  }
};
