import type { StoredUser } from '../auth/auth.types';

export type AuthRepository = {
  createUser(user: StoredUser): Promise<void>;
  findUserByEmail(email: string): Promise<StoredUser | undefined>;
  findUserById(id: string): Promise<StoredUser | undefined>;
  createSession(token: string, userId: string): Promise<void>;
  findUserIdByToken(token: string): Promise<string | undefined>;
};

export type RepoFactory = {
  create: () => Promise<AuthRepository>;
};
