export type MotivationList = {
  motivation_id: string;
  motivation_author: string;
  motivation_content: string;
  motivation_category_id: string;
};

export type CreateMotivationRequest = {
  author: string;
  content: string;
  motivation_category_id: string;
};

export type CreateMotivationSuccessResponse = {
  status: true;
  message: string;
  data: {
    motivation_id: string;
    motivation_author: string;
    motivation_content: string;
    motivation_category_id: string;
  };
  timestamp: string;
};
