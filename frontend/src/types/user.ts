export interface UserDetailType {
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
}

export interface Users {
  user_id: string;
  user_name: string;
  user_email: string;
  user_phone_number?: string;
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
}
