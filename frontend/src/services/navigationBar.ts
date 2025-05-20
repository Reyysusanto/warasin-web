import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { DetailUserSuccessResponse } from "@/types/user";
import axios from "axios";

export const getNavigationUserDetailService = async (): Promise<
  DetailUserSuccessResponse | ErrorResponse | undefined
> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<DetailUserSuccessResponse>(
      `${baseURL}/user/get-detail-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === true) {
      return response.data as DetailUserSuccessResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    }
  }
};