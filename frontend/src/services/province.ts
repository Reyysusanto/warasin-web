import { baseURL } from "@/config/api"
import { ErrorResponse } from "@/types/type"
import axios, { AxiosError } from "axios"

type ProvincesSuccessResponse = {
    status: boolean
    message: string
    data: Array<{
        province_id: string
        province_name: string
    }>
    timestamp: string
}

type CitySuccessResponse = {
    status: boolean
    message: string
    data: Array<{
        city_id: string
        city_name: string
        city_type: string
    }>
    timestamp: string
}

export const getProvincesService = async (): Promise<
  ProvincesSuccessResponse | ErrorResponse
> => {
  try {
    const response = await axios.get(`${baseURL}/user/get-all-province`);

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
    const response = await axios.get(`${baseURL}/user/get-all-city?province_id=${province_id}`);

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
