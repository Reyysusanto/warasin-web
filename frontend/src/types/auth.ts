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

export type RegisterSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
  };
};

export type LoginSuccessResponse = {
  status: true;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
  timestamp: string;
};

export type LoginAdminSuccessResponse = {
  status: true;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
  timestamp: string;
};