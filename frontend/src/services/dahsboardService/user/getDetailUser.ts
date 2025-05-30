import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { UserResponse } from "@/types/user";
import axios from "axios";

export const getUserDetailAdminService = async (
  user_id: string
): Promise<UserResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${baseURL}/admin/get-detail-user/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data as UserResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login-admin";
        throw new Error("Email atau password salah");
      }
    }
    throw new Error("Error fetching user details");
  }
};
