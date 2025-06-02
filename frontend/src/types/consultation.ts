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
