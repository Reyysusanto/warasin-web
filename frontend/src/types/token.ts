export type TokenSuccessResponse = {
  status: true;
  message: string;
  data: {
    access_token: string;
  };
  timestamp: string;
};
