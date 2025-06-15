import { baseURL } from "@/config/api";
import { ChatBotResponse } from "@/types/chatbot";
import { ErrorResponse } from "@/types/error";
import axios, { AxiosError } from "axios";

export const sendChatMessageService = async (
  message: string,
  conversationId?: string
): Promise<ChatBotResponse | ErrorResponse> => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/user/chat`,
      {
        message,
        conversation_id: conversationId || undefined,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data as ChatBotResponse;
    } else {
      return response.data as ErrorResponse;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Token telah kadaluarsa");
        }

        if (axiosError.response.data.status === false) {
          throw new Error(
            axiosError.response.data.error ||
              axiosError.response.data.message ||
              "Gagal menambahkan data"
          );
        }
      }
    }
    throw new Error("Terjadi kesalahan saat menambahkan data");
  }
};
