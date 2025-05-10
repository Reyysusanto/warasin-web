export type Role = {
  role_id: string;
  role_name: string;
};

export type RoleSuccessResponse = {
  status: true;
  message: string;
  data: Array<{
    role_id: string;
    role_name: string;
  }>;
  timestamp: string;
};