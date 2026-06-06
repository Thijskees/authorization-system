import type { StoredUser } from '../auth/auth.types';
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
};

export type RepoFactory = {
  create: () => Promise<AuthRepository>;
};
