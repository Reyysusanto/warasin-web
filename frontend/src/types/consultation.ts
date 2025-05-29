import { Psycholog } from "./psycholog";
import { User } from "./user";

export type Consulation = {
  consul_id: string;
  consul_date: string;
  consul_rate: number;
  consul_comment: string;
  user: User;
  psycholog: Psycholog;
};

export type GetAllConsultationResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: Array<{
    consul_id: string;
    consul_date: string;
    consul_rate: number;
    consul_comment: string;
    user: User;
    psycholog: Psycholog;
  }>;
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
};
