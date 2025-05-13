import { baseURL } from "@/config/api";
import { ErrorResponse } from "@/types/error";
import { TokenSuccessResponse } from "@/types/token";
import axios from "axios";

export const adminRefreshTokenService = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    const response = await axios.post<TokenSuccessResponse | ErrorResponse>(
      `${baseURL}/admin/refresh-token`,
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data.status === true) {
      const newAccessToken = response.data.data.access_token;
      localStorage.setItem("token", newAccessToken);
    }
  } catch (error) {
    console.log("Gagal mengambil refresh token", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login-admin";
    throw new Error("Refresh token expired. Please log in again.");
  }
};
