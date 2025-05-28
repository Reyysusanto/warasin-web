export type Language = {
  lang_id: string;
  lang_name: string;
};

export type Specialization = {
  spe_id: string;
  spe_name: string;
  spe_desc: string;
};

export type Education = {
  edu_id: string;
  edu_degree: string;
  edu_major: string;
  edu_institution: string;
  edu_graduation_year: string;
};

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
  language: Array<{
    lang_id: string;
    lang_name: string;
  }>;
  specialization: Array<{
    spe_id: string;
    spe_name: string;
    spe_desc: string;
  }>;
  education: Array<{
    edu_id: string;
    edu_degree: string;
    edu_major: string;
    edu_institution: string;
    edu_graduation_year: string;
  }>;
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

export type PsychologResponse = {
  status: true;
  message: string;
  timestamp: string;
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
    language: Array<{
      lang_id: string;
      lang_name: string;
    }>;
    specialization: Array<{
      spe_id: string;
      spe_name: string;
      spe_desc: string;
    }>;
    education: Array<{
      edu_id: string;
      edu_degree: string;
      edu_major: string;
      edu_institution: string;
      edu_graduation_year: string;
    }>;
  };
};

export type GetAllPsychologResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: Array<{
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
    language: Array<{
      lang_id: string;
      lang_name: string;
    }>;
    specialization: Array<{
      spe_id: string;
      spe_name: string;
      spe_desc: string;
    }>;
    education: Array<{
      edu_id: string;
      edu_degree: string;
      edu_major: string;
      edu_institution: string;
      edu_graduation_year: string;
    }>;
  }>;
};
