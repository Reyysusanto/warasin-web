export type UserList = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  is_verified: boolean;
  city: {
    city_id: null;
    city_name: string;
    city_type: string;
    province: {
      province_id: null;
      province_name: string;
    };
  };
  role: {
    role_id: string;
    role_name: string;
  };
};

export type UsersSuccessResponse = {
  status: boolean;
  message: string;
  meta: {
    page: number;
    per_page: 10;
    max_page: number;
    count: number;
  };
  data: Array<{
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    is_verified: boolean;
    city: {
      city_id: null;
      city_name: string;
      city_type: string;
      province: {
        province_id: null;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  }>;
  timestamp: string;
};

export type UpdateDetailUserRequest = {
  name: string;
  user_phone_number: string;
  email: string;
  user_birth_date: string;
  // user_gender: boolean;
  province_id: string;
  city_id: string;
};

export type UpdateUserAdminRequest = {
  name: string;
  user_phone_number: string;
  email: string;
  user_birth_date: string;
  user_gender: boolean;
  province_id: string;
  city_id: string;
  role_id: string;
};

export type DetailUserSuccessResponse = {
  status: boolean;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_birth_date: string;
    user_phone_number: string;
    is_verified?: boolean;
    city?: {
      city_id: string;
      city_name: string;
      city_type: string;
      province?: {
        province_id?: string;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  };
  timestamp: string;
};

export type UpdateDetailUserSuccessResponse = {
  status: boolean;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    is_verified: boolean;
    city: {
      city_id: string | null;
      city_name: string;
      city_type: string;
      province: {
        province_id: string | null;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  };
  timestamp: string;
};

export type updateUserAdminResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_birth_date: string;
    user_phone_number: string;
    is_verified: boolean;
    city: {
      city_id: string;
      city_name: string;
      city_type: string;
      province: {
        province_id: string;
        province_name: string;
      };
    };
    role: {
      role_id: string;
      role_name: string;
    };
  };
  timestamp: string;
};
