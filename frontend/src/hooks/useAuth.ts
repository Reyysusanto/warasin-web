import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/authProvider";
import {jwtDecode} from "jwt-decode"

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { token, login } = context;

  const user = useMemo(() => {
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  }, [token]);

  return { token, login, user };
};
