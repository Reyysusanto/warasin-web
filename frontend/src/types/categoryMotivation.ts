export type CategoryList = {
  motivation_category_id: string;
  motivation_category_name: string;
};

export type CreateCategoryRequest = {
  name: string;
};

export type CreateCategoryMotivationSuccessResponse = {
  status: true;
  message: string;
  data: {
    motivation_category_id: string;
    motivation_category_name: string;
  };
  timestamp: string;
};

export type GetAllCategoryMotivationSuccessResponse = {
  status: true;
  message: string;
  data: Array<{
    motivation_category_id: string;
    motivation_category_name: string;
  }>;
  timestamp: string;
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
};

export type DeleteCategoryMotivationSuccessResponse = {
  status: true;
  message: string;
  data: {
    motivation_category_id: string;
    motivation_category_name: string;
  };
  timestamp: string;
};
