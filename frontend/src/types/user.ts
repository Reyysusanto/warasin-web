export type User = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_image: string;
  user_gender: boolean;
  user_birth_date: string;
  user_phone_number: string;
  is_verified: boolean;
  user_data01: number;
  user_data02: number;
  user_data03: number;
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

export type AllUserResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: Array<{
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_image: string;
    user_gender: boolean;
    user_birth_date: string;
    user_phone_number: string;
    is_verified: boolean;
    user_data01: number;
    user_data02: number;
    user_data03: number;
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
  }>;
};

export type UpdateDetailUserRequest = {
  name: string;
  phone_number: string;
  email: string;
  birth_date: string;
  gender: boolean | null;
  province_id: string;
  city_id: string;
};

export type UpdateUserAdminRequest = {
  name: string;
  phone_number: string;
  email: string;
  birth_date: string;
  gender: boolean | null;
  province_id: string;
  city_id: string;
  role_id: string;
};

export type UserResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_image: string;
    user_gender: boolean;
    user_birth_date: string;
    user_phone_number: string;
    is_verified: boolean;
    user_data01: number;
    user_data02: number;
    user_data03: number;
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
};
