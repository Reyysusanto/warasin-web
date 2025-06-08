import { User } from "./user";

export type News = {
  news_id: string;
  news_image: string;
  news_title: string;
  news_body: string;
  news_date: string;
};

export type createNewsRequest = {
  title: string;
  body: string;
  date: Date;
  image: string;
};

export type UpdateNewsRequest = {
  image: string;
  title: string;
  body: string;
  date: string;
};

export type AllNewsResponse = {
  status: true;
  message: string;
  data: Array<{
    news_id: string;
    news_image: string;
    news_title: string;
    news_body: string;
    news_date: string;
  }>;
  timestamp: string;
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
};

export type NewsResponse = {
  status: true;
  message: string;
  data: {
    news_id: string;
    news_image: string;
    news_title: string;
    news_body: string;
    news_date: string;
  };
  timestamp: string;
};

export type AllNewsDetailResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: News[];
};

export type CreateNewsUserRequest = {
  news_detail_date: string;
  news_id: string;
};

export type CreateNewsUserResponse = {
  status: true;
  message: string;
  timestamp: string;
  data: {
    news_detail_id: string;
    news_detail_date: string;
    user: User;
    news: News;
  };
};
