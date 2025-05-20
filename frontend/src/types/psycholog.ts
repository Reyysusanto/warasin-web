export type Psycholog = {
  psy_id: string;
  psy_name: string;
  psy_str_number: string;
  psy_email: string;
  psy_password: string;
  psy_work_year: string;
  psy_description: string;
  psy_phone_number: string;
  psy_image: string;
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

export type CreatePsychologRequest = {
  name: string;
  str_number: string;
  email: string;
  password: string;
  work_year: string;
  description: string;
  phone_number: string;
  city_id: string;
  role_id: string;
};

export type CreatePsychologResponse = {
  status: true;
  message: string;
  data: {
    psy_id: string;
    psy_name: string;
    psy_str_number: string;
    psy_email: string;
    psy_password: string;
    psy_work_year: string;
    psy_description: string;
    psy_phone_number: string;
    psy_image: string;
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

export type GetDetailPsychologResponse = {
  status: true;
  message: string;
  data: {
    psy_id: string;
    psy_name: string;
    psy_str_number: string;
    psy_email: string;
    psy_password: string;
    psy_work_year: string;
    psy_description: string;
    psy_phone_number: string;
    psy_image: string;
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
