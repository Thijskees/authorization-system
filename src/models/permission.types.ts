export type Permission = {
  id: string;
  code: string;
  description?: string;
  createdAt: string;
};

export type CreatePermissionInput = {
  code: string;
  description?: string;
};
