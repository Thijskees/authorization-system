import type { StoredUser } from '../auth/auth.types';
import type { Permission } from '../models/permission.types';
import type { Role } from '../models/role.types';

export type AuthRepository = {
  createUser(user: StoredUser): Promise<void>;
  findUserByEmail(email: string): Promise<StoredUser | undefined>;
  findUserById(id: string): Promise<StoredUser | undefined>;
  listUsers(): Promise<StoredUser[]>;
  createSession(token: string, userId: string): Promise<void>;
  findUserIdByToken(token: string): Promise<string | undefined>;
  createRole(role: Role): Promise<void>;
  findRoleById(id: string): Promise<Role | undefined>;
  listRoles(): Promise<Role[]>;
  updateRole(role: Role): Promise<void>;
  createPermission(permission: Permission): Promise<void>;
  findPermissionById(id: string): Promise<Permission | undefined>;
  findPermissionByCode(code: string): Promise<Permission | undefined>;
  listPermissions(): Promise<Permission[]>;
};

export type RepoFactory = {
  create: () => Promise<AuthRepository>;
};
