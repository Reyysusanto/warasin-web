import { Psycholog } from "./psycholog";

export type Province = {
  province_id: string;
  province_name: string;
};

export type City = {
  city_id: string;
  city_name: string;
  city_type: string;
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

export type Language = {
  lang_id: string;
  lang_name: string;
};

export type LanguageResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    language_master: Language[];
  };
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

export type AvailableSlot = {
  slot_id: string;
  slot_start: string;
  slot_end: string;
  slot_is_booked: boolean;
};

export type AvailableSlotResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    psycholog: Psycholog;
    available_slot: AvailableSlot[];
  };
};

export type Schedule = {
  prac_sched_id: string;
  prac_sched_day: string;
  prac_sched_open: string;
  prac_sched_close: string;
};

export type Practice = {
  prac_id: string;
  prac_type: string;
  prac_name: string;
  prac_address: string;
  prac_phone_number: string;
  practice_schedule?: Schedule[];
};

export type PracticeRequest = {
  prac_type: string;
  prac_name: string;
  prac_address: string;
  prac_phone_number: string;
};

export type PracticeResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    psycholog: Psycholog;
    practice: Practice[];
  };
};
