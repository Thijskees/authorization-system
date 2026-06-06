export type Permission = string;

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
  createdAt: string;
};

export type CreateRoleInput = {
  name: string;
  permissions?: Permission[];
};
