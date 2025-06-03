import { AvailableSlot, Practice } from "./master";
import { Psycholog } from "./psycholog";
import { User } from "./user";

export type Consultation = {
  consul_id: string;
  consul_date: string;
  consul_rate: number;
  consul_comment: string;
  consul_status: number;
  user: User;
  available_slot: AvailableSlot;
  practice: Practice;
};

export type AllConsultationResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    psycholog: Psycholog;
    consultation: Consultation[];
  };
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
};

export type ConsultationResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: Consultation;
};

export type ConsultationUser = {
  consul_id: string;
  consul_date: string;
  consul_rate: number;
  consul_comment: string;
  consul_status: number;
  psycholog: Psycholog;
  available_slot: AvailableSlot;
  practice: Practice;
};

export type ConsultationUserRequest = {
  consul_date: string;
  consul_rate: number;
  consul_status: number;
  consul_comment: string;
  slot_id: string;
  prac_id: string;
  psy_id: string;
};

export type AllConsultationUserResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    user: User;
    consultation: Array<{
      consul_id: string;
      consul_date: string;
      consul_rate: number;
      consul_comment: string;
      consul_status: number;
      psycholog: Psycholog;
      available_slot: AvailableSlot;
      practice: Practice;
    }>;
  };
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
};

export type ConsultationUserResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    consul_id: string;
    consul_date: string;
    consul_rate: number;
    consul_comment: string;
    consul_status: number;
    psycholog: Psycholog;
    available_slot: AvailableSlot;
    practice: Practice;
  };
};
