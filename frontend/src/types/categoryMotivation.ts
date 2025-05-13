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
