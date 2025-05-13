export type NewsLlist = {
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

export type createNewsSuccessResponse = {
  status: true;
  message: string;
  data: Array<{
    news_id: string;
    news_image: string;
    news_title: string;
    news_body: string;
    news_date: Date;
  }>;
  timestamp: string;
};

export type getAllNewsSuccessResponse = {
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
};
