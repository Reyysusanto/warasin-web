// @/config/api.ts
import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_URL
    : process.env.NEXT_PUBLIC_PROD_API_URL;

console.log("ENV NODE_ENV:", process.env.NODE_ENV);
console.log("Base URL:", baseURL);

export const axiosInstance = axios.create({
  baseURL,
});
