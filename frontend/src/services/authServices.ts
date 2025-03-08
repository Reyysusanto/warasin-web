import axios from "axios";
import { API_ENDPOINTS } from "./api";
import { RegisterRequest } from "@/types/type";

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (err) {
      console.log(`Login error : ${err}`);
      throw err;
    }
  },

  register: async (userData: RegisterRequest) => {
    console.log(API_ENDPOINTS.REGISTER)
    try {
      const response = await axios.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (err) {
      console.error(`Registration error: ${err}`);
      throw err;
    }
  },
};
