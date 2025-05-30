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