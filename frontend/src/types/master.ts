export type Province = {
  province_id: string;
  province_name: string;
};

export type City = {
  city_id: string;
  city_name: string;
  city_type: string;
};

export type Language = {
  lang_id: string;
  lang_name: string;
};

export type Specialization = {
  spe_id: string;
  spe_name: string;
  spe_desc: string;
};

export type SpecializationResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    specialization: Specialization[];
  };
};

export type LanguageResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    language_master: Language[];
  };
};

export type ProvincesSuccessResponse = {
  status: boolean;
  message: string;
  data: Array<{
    province_id: string;
    province_name: string;
  }>;
  timestamp: string;
};

export type CitySuccessResponse = {
  status: boolean;
  message: string;
  data: Array<{
    city_id: string;
    city_name: string;
    city_type: string;
  }>;
  timestamp: string;
};
