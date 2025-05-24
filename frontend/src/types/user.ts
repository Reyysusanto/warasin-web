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

export type DetailUserSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_image: string;
    user_gender: boolean | null;
    user_birth_date: string;
    user_phone_number: string;
    user_data01: number;
    user_data02: number;
    user_data03: number;
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

export type UpdateDetailUserSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_image: string;
    user_gender: boolean;
    user_birth_date: string;
    user_phone_number: string;
    user_data01: number;
    user_data02: number;
    user_data03: number;
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

export type GetDetailUserSuccessResponse = {
  status: true;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_image: string;
    user_gender: boolean;
    user_birth_date: string;
    user_phone_number: string;
    user_data01: number;
    user_data02: number;
    user_data03: number;
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