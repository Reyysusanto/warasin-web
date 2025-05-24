export type MotivationList = {
  motivation_id: string;
  motivation_author: string;
  motivation_content: string;
  motivation_category: {
    motivation_category_id: string;
    motivation_category_name: string;
  };
};

export type CreateMotivationRequest = {
  author: string;
  content: string;
  motivation_category_id: string;
};

export type UpdateMotivationRequest = {
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

export type GetAllMotivationsSuccessRespone = {
  status: true;
  message: string;
  data: Array<{
    motivation_id: string;
    motivation_author: string;
    motivation_content: string;
    motivation_category: {
      motivation_category_id: string;
      motivation_category_name: string;
    };
  }>;
  timestamp: string;
  meta: {
    page: 1;
    per_page: 10;
    max_page: 2;
    count: 12;
  };
};

export type GetDetailMotivationsSuccessRespone = {
  status: true;
  message: string;
  data: {
    motivation_id: string;
    motivation_author: string;
    motivation_content: string;
    motivation_category: {
      motivation_category_id: string;
      motivation_category_name: string;
    };
  };
  timestamp: string;
};

export type DeleteMotivationResponse = {
  status: true;
  message: string;
  data: {
    motivation_id: string;
    motivation_author: string;
    motivation_content: string;
    motivation_category: {
      motivation_category_id: string;
      motivation_category_name: string;
    };
  };
  timestamp: string;
};
