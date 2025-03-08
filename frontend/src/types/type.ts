export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
  };
  
export type RegisterResponse = {
    status: boolean;
    message: string;
    data: {
      user_id: string;
      name: string;
      email: string;
      password: string;
    };
  };