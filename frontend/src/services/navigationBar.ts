import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UserResponse } from "@/types/user";
import axios from "axios";

export const getNavigationUserDetailService = async (): Promise<
  UserResponse | ErrorResponse | undefined
> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<UserResponse>(
      `${baseURL}/user/get-detail-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === true) {
      return response.data as UserResponse;
    } else {
      return response.data as unknown as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
    }
  }
};
