import { baseURL } from "@/config/api"
import { ErrorResponse } from "@/types/error"
import { CitySuccessResponse, ProvincesSuccessResponse } from "@/types/region";
import axios, { AxiosError } from "axios"

export const getProvincesService = async (): Promise<
  ProvincesSuccessResponse | ErrorResponse
> => {
  try {
    const response = await axios.get(`${baseURL}/get-all-province`);

    if (response.status === 200) {
      return response.data as ProvincesSuccessResponse;
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
              "Gagal mengambil data"
          );
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};

export const getCityService = async (province_id: string): Promise<
  CitySuccessResponse | ErrorResponse | null
> => {
  try {
    const response = await axios.get(`${baseURL}/get-all-city?province_id=${province_id}`);

    if (response.status === 200) {
      return response.data as CitySuccessResponse;
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
              "Gagal mengambil data"
          );
        }
      }
    }

    throw new Error(
      "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
    );
  }
};
