import type { AuthRepository } from './repository';
import type { StoredUser } from '../auth/auth.types';
import type { Role } from '../models/role.types';

export const createMemoryRepository = async (): Promise<AuthRepository> => {
  const usersById = new Map<string, StoredUser>();
  const usersByEmail = new Map<string, StoredUser>();
  const sessionsByToken = new Map<string, string>();
  const rolesById = new Map<string, Role>();

  return {
    async createUser(user: StoredUser) {
      usersById.set(user.id, user);
      usersByEmail.set(user.email, user);
    },
    async findUserByEmail(email: string) {
      return usersByEmail.get(email);
    },
    async findUserById(id: string) {
      return usersById.get(id);
    },
    async listUsers() {
      return Array.from(usersById.values());
    },
    async createSession(token: string, userId: string) {
      sessionsByToken.set(token, userId);
    },
    async findUserIdByToken(token: string) {
      return sessionsByToken.get(token);
    },
    async createRole(role: Role) {
      rolesById.set(role.id, role);
    },
    async findRoleById(id: string) {
      return rolesById.get(id);
    },
    async listRoles() {
      return Array.from(rolesById.values());
    },
    async updateRole(role: Role) {
      rolesById.set(role.id, role);
    },
  };
};
